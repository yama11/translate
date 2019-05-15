<script>
/**
 * @overview 图片批量上传
 *
 * @author suyanping
 */
// eslint-disable-next-line
import picdiet from 'picdiet';

export default {
  name: 'AppUploadBatch',

  props: {

  },

  data() {
    return {
      fileLength: 0,

      fileList: [],

      fileObj: {},

      isShow: false,

      actionStatus: {
        1: '上传',
        2: '上传中',
        3: '上传成功',
        4: '重新上传',
      },

      selectStatus: [
        {
          value: 1,
          label: '是',
        },
        {
          value: 2,
          label: '否',
        },
      ],

      isCompress: 1,

    };
  },

  computed: {

  },

  methods: {
    clearVal() {
      const inputs = document.getElementById('inputFile');

      inputs.value = '';

      this.fileList = [];

      this.fileLength = 0;

      this.isShow = false;
    },

    checkFiles() {
      const lengths = this.fileList.length;

      if (lengths === 0) {
        this.$message.error('请上传章节以及图片');

        return;
      }

      const chapterNames = this.getChapterNames(this.fileObj);

      const chapters = [];
      // eslint-disable-next-line
      for(let [index,chapterName] of chapterNames.entries()){
        const pageArr = this.fileObj[chapterName];
        // eslint-disable-next-line
        for (const page of pageArr) {
          if (!page.name || !page.w || !page.h) {
            this.$message.error('请上传成功之后在确定保存');

            return;
          }
        }

        chapters.push(pageArr);
      }

      this.$emit('getFiles', chapters);
    },

    uploadFile() {
      this.$refs.inputFile.click();
    },

    uploadImg() {
      this.fileList = [];

      this.fileObj = {};

      const files = document.getElementById('inputFile').files;

      const inputs = document.getElementById('inputFile');

      this.fileLength = files.length;
      // eslint-disable-next-line
      for (let obj of files) {
        const pattern = /^image\/(jpe?g|JPE?G)$/;
        const isPicture = pattern.test(obj.type);

        if (!isPicture) {
          this.$message.error('上传图片只能是 jpg 格式!');

          inputs.value = '';
          this.isShow = false;
          this.fileLength = 0;
          this.fileObj = {};

          return;
        }

        const relPath = obj.webkitRelativePath;
        let path = '';
        if (relPath) {
          const pathArr = relPath.split('/');
          if (pathArr.length > 2) {
            path = pathArr[1];
          } else {
            path = pathArr[0];
          }
        }
        const exp = /^[0-9]*$/;
        if (!exp.test(path)) {
          // eslint-disable-next-line
          continue;
        }
        this.fileObj[path] = this.fileObj[path] || [];
        const name = obj.name;
        let index = '0';
        if (name) {
          const exps = /\d/g;
          const result = name.match(exps);
          // eslint-disable-next-line
          if (result) index = parseInt(result.join(''));

          if (index === '0') {
            // eslint-disable-next-line
            continue;
          }
        }

        this.fileObj[path].push({ name, file: obj, index });
      }

      const fileNames = this.getChapterNames(this.fileObj);
      // eslint-disable-next-line
      for(let chapterName of fileNames){
        let chapterFiles = this.fileObj[chapterName];
        chapterFiles = chapterFiles.sort((a, b) => a.index - b.index);
        const count = chapterFiles.length;
        this.fileList.push({ name: chapterName, count, status: 1, width: 0 });
      }

      this.isShow = true;
    },

    uploadAction(files, i, type, upIndex, successCount, errCount, isCompress = 1) {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      xhr.timeout = 60000;
      const fileCount = files.length;
      const oneFileObj = files[i];

      if (!oneFileObj) return;

      if ((oneFileObj.src && oneFileObj.h && oneFileObj.w)) {
        // eslint-disable-next-line
        ++i;
        // eslint-disable-next-line
        ++successCount;
        this.fileList[upIndex].width = `${(successCount / fileCount) * 100}%`;

        if (i < fileCount) {
          this.uploadAction(files, i, type, upIndex, successCount, errCount, isCompress);

          return;
        }

        this.fileList[upIndex].status = 3;

        return;
      }

      const chapterName = oneFileObj.name;
      const host = 'http://translate.sidewalkgroup.com/api.php?s=api/Index/upload';

      formData.append('index', oneFileObj.index);

      if (isCompress === 1) {
        this.getImageData(oneFileObj.file).then((data) => {
          const result = picdiet(data, { quality: '78' });
          const blob = new Blob([result.data], { type: 'image/jpeg' });
          formData.append('file', blob, chapterName);
          xhr.open('POST', host, true);
          xhr.send(formData);
        });
      } else {
        formData.append('file', oneFileObj.file, chapterName);
        xhr.open('POST', host, true);
        xhr.send(formData);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            if (res.data[chapterName]) {
              Object.assign(oneFileObj, res.data[chapterName]);
              Reflect.deleteProperty(oneFileObj, 'file');
              // eslint-disable-next-line
              ++successCount;
              this.fileList[upIndex].width = `${(successCount / fileCount) * 100}%`;
            } else {
              // eslint-disable-next-line
              ++errCount;

              this.$message.error(res.errMsg);
            }
          } else {
            // eslint-disable-next-line
            ++errCount;
          }
          // eslint-disable-next-line
          i++;
          if (i < fileCount) {
            this.uploadAction(files, i, type, upIndex, successCount, errCount, isCompress);
          } else {
            if (errCount > 0) this.fileList[upIndex].status = 4;

            if (!errCount) this.fileList[upIndex].status = 3;
          }
        }
      };
    },

    uploadOne(upName, upIndex) {
      const type = 1;
      // const isCompress = 1;

      const status = this.fileList[upIndex].status;

      if (status && status === 2) {
        this.$message.error('正在上传，请勿重复点击');

        return;
      }

      this.fileList[upIndex].status = 2;
      this.uploadAction(this.fileObj[upName], 0, type, upIndex, 0, 0, this.isCompress);
    },

    deiFiles(delIndex, name) {
      this.fileList = this.fileList.filter((item, index) => index !== delIndex);

      delete this.fileObj[name];

      const fileArr = Object.values(this.fileObj);

      if (fileArr.length > 0) {
        this.fileLength = fileArr.reduce((acc, item) => {
          // eslint-disable-next-line
          acc += item.length;

          return acc;
        }, 0);
      }

      const inputs = this.$refs.inputFile;

      if (this.fileList.length === 0) {
        this.isShow = false;
        inputs.value = '';
        this.fileLength = 0;
        this.fileObj = {};
      }
    },

    getChapterNames(fileObj) {
      let fileNames = Object.keys(fileObj);
      // eslint-disable-next-line
      fileNames = fileNames.sort((a, b) => parseInt(a) - parseInt(b));
      return fileNames;
    },

    styleWidth(lengths) {
      return { width: lengths };
    },

    getImageData(file) {
      // eslint-disable-next-line
      let [readAsText, readAsArrayBuffer, readAsDataURL] = ['readAsText', 'readAsArrayBuffer', 'readAsDataURL'].map(read => file => new Promise(resolve => {
        const reader = new FileReader();
        reader[read](file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      }));

      return readAsArrayBuffer(file).then(buffer => new Uint8Array(buffer));
    },

    uploadAuto() {
      this.$confirm(
        '是否确认托管，自动上传?',
        {
          showCancelButton: true,
          confirmButtonText: '确定',
          center: true,
        })
        .then(() => {
          let chapterNames = this.getChapterNames(this.fileObj);

          let progress = [];
          const progressSize = 4;
          const timeUpload = setInterval(() => {
            const delProgress = [];

            // eslint-disable-next-line
            for (let name of progress) {
              const itemFile = this.fileList.find(item => item.name === name);

              if (itemFile.status === 3) {
                delProgress.push(name);
              } else if (itemFile.status === 4) {
                chapterNames.unshift(name);
                delProgress.push(name);
              }
            }

            progress = progress.filter(item => !delProgress.includes(item));

            if (progressSize === progress.length) return;

            const delChapter = [];

            // eslint-disable-next-line
            for(let name of chapterNames){
              const itemFile = this.fileList.find(item => item.name === name);
              const indexFile = this.fileList.findIndex(item => item.name === name);
              if (itemFile.status !== 2) {
                this.uploadOne(itemFile.name, indexFile);
              }

              delChapter.push(name);
              progress.push(name);
              if (progressSize === progress.length) break;
            }

            chapterNames = chapterNames.filter(item => !delChapter.includes(item));

            if (!chapterNames.length && !progress.length) {
              clearInterval(timeUpload);
            }
          }, 2000);
        })
        .catch(() => {})
        .finally(() => {
        });
    },

  },
};
</script>

<template>
  <div class="app-upload-batch">
    <div class="app-upload-batch__file">
      选择图片文件
      <el-button
        type="primary"
        size="small"
        @click="uploadFile">
        选择文件
      </el-button>
      <input
        id="inputFile"
        ref="inputFile"
        type="file"
        style="display:none"
        webkitdirectory
        @change="uploadImg">

      <span
        v-if="fileLength > 0"
        class="batch-list__tip">{{ fileLength }}个文件</span>

      <div class="app-upload-batch__compress">
        是否压缩 : <el-select
          v-model="isCompress"
          size="small"
          placeholder="是否压缩">
          <el-option
            v-for="item in selectStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>

    </div>

    <div class="app-upload-batch__list">
      <div class="app-upload-batch__btn">
        <el-button
          v-if="isShow"
          type="primary"
          size="small"
          @click="uploadAuto">
          一键托管
        </el-button>
      </div>
      <div>
        <div
          v-for="(item,index) in fileList"
          :key="index"
          class="app-upload-batch__tip">
          <div>章节名称：Ch.{{ item.name }} 图片数量：{{ item.count }}</div>
          <div class="app-upload-batch__progress">
            <div :style="styleWidth(item.width)"/>
          </div>
          <div class="app-upload-batch__action">
            <span @click="deiFiles(index,item.name)">删除</span>
            <span @click="uploadOne(item.name,index)">{{ actionStatus[item.status] }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="postcss">
.batch-list__tip{
    color: #0099ff;
}

.app-upload-batch__compress{
  float: right;
  margin-top: 5px;
}

.app-upload-batch__compress .el-select{
  width: 75px;
}

.app-upload-batch__list{
  position: relative;
}

.app-upload-batch__btn{
  position: absolute;
  top: 20px;
}

.app-upload-batch__list>div{
  display: inline-block;
}

.app-upload-batch__tip{
  width: 250px;
  margin-top: 15px;
  margin-left: 120px;
}

.app-upload-batch__progress{
  width: 100%;
  height: 12px;
  border-radius: 5px;
  margin: 3px 0;
  background: gainsboro;
}

.app-upload-batch__progress > div{
  height: 100%;
  background: #52ad52;
  border-radius: 5px;
}

.app-upload-batch__action>span{
  color: #0099ff;
  cursor: pointer;
  margin-right: 20px;
}
</style>
