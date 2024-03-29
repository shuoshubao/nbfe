<template>
  <div id="app" style="display: none">
    <mtd-card class="stylelint-results">
      <div slot="title" style="overflow: hidden">
        <span style="float: left">Stylelint报告</span>
        <span style="float: left; margin-left: 50px">
          <span style="margin-right: : 10px;">排序:</span>
          <mtd-radio-group v-model="sortModel" @change="handleChangeSort" size="small">
            <mtd-radio-button :value="1">错误数</mtd-radio-button>
            <mtd-radio-button :value="2">文件路径</mtd-radio-button>
          </mtd-radio-group>
        </span>
        <mtd-button @click="handleOpenCloseAll(openAll)" type="primary" size="small" style="float: right">
          {{ openAll ? '全部折叠' : '全部展开' }}
        </mtd-button>
      </div>
      <mtd-card
        :class="[
          'box-card',
          item.close ? 'close' : 'open',
          {
            'is-error': item.errorCount,
            'is-warning': item.errorCount === 0 && item.warningCount,
            'is-success': item.errorCount + item.warningCount === 0
          }
        ]"
        :body-style="{ padding: 0 }"
        shadow="never"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div slot="title" @click="() => handleOpenItem(index)">
          <mtd-icon name="check"></mtd-icon>
          <mtd-icon name="right"></mtd-icon>
          <mtd-icon name="down"></mtd-icon>
          <span class="source" @click.stop>{{ item.source }}</span>
          <mtd-tooltip content="点击复制文件路径" placement="top">
            <mtd-icon name="copy-o" @click.stop="handleCopyFilePath(item)" />
          </mtd-tooltip>
          <b class="error-warning-count" style="font-size: 12px">
            <span>{{ item.errorCount + item.warningCount }} problems</span>
            <span v-if="item.errorCount + item.warningCount !== 0">
              <span>(</span>
              <span>{{ item.errorCount }} errors,</span>
              <span>{{ item.warningCount }} warnings</span>
              <span>)</span>
            </span>
          </b>
        </div>
        <mtd-table
          v-show="item.warnings.length"
          :data="item.warnings"
          :show-header="false"
          style="width: 100%"
          size="small"
        >
          <mtd-table-column width="70">
            <template slot-scope="scope">
              <mtd-tooltip content="点击复制文件路径和行号" placement="top">
                <span class="code-line" @click="handleCopyFilePath(item, scope.row)">
                  {{ [scope.row.line, scope.row.column].join(':') }}
                </span>
              </mtd-tooltip>
            </template>
          </mtd-table-column>
          <mtd-table-column width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.severity === 'warning'" class="color-warning">Warning</span>
              <span v-if="scope.row.severity === 'error'" class="color-danger">Error</span>
              <mtd-tooltip content="点击查看源码" placement="top">
                <mtd-icon name="code" @click.stop="handleShowCode(item, scope.row)" />
              </mtd-tooltip>
            </template>
          </mtd-table-column>
          <mtd-table-column>
            <template slot-scope="scope">
              <mtd-tooltip
                :content="scope.row.text"
                placement="top"
                popper-class="popper-class-row-text"
                :style="{ width: 500 }"
              >
                <pre style="margin: 0">{{ scope.row.text }}</pre>
              </mtd-tooltip>
            </template>
          </mtd-table-column>
          <mtd-table-column align="right" width="200">
            <template slot-scope="scope" v-if="scope.row.rule">
              <a :href="scope.row.url" target="_blank">{{ scope.row.rule }}</a>
            </template>
          </mtd-table-column>
        </mtd-table>
      </mtd-card>
    </mtd-card>
    <mtd-modal :title="modalData.title" v-model="modalData.visible" width="90%" mask-closable>
      <div class="css-source-container">
        <pre
          v-for="(item, index) in modalData.cssArr"
          :class="modalData.selectItem.line === index + 1 ? 'highlight' : ''"
          >{{ item }}</pre
        >
      </div>
      <div slot="footer">
        <mtd-announcement :type="modalData.selectItem.severity" show-icon :description="modalData.selectItem.text" />
      </div>
    </mtd-modal>
  </div>
</template>

<script>
const { get, sortBy, sum, isString } = _

const { StylelintResults = [], RulesMeta = [] } = window

Vue.use(MTD)

new Vue({
  el: '#app',
  data: {
    openAll: true,
    sortModel: 1,
    tableData: [],
    modalData: {
      visible: false,
      title: '',
      cssArr: [],
      selectItem: {}
    }
  },
  methods: {
    initStylelintResults() {
      StylelintResults.forEach(v => {
        v.close = false
        v.errorCount = v.warnings.filter(v => v.severity === 'error').length
        v.warningCount = v.warnings.filter(v => v.severity === 'warning').length
        v.warnings.forEach(v2 => {
          const { rule } = v2
          v2.url = `https://stylelint.io/user-guide/rules/${rule}`
          if (rule === 'prettier/prettier') {
            v2.url = 'https://github.com/prettier/stylelint-prettier'
          }
          if (rule.includes('order')) {
            v2.url = 'https://github.com/constverum/stylelint-config-rational-order'
          }
        })
      })
    },
    handleOpenItem(index) {
      const { close, errorCount, warningCount } = this.tableData[index]
      if (errorCount + warningCount === 0) {
        return
      }
      this.tableData[index].close = !close
    },
    handleOpenCloseAll(openAll) {
      this.openAll = !openAll
      this.tableData.forEach(v => {
        v.close = !this.openAll
      })
    },
    handleCopyFilePath({ source }, row = {}) {
      const { line, column } = row
      const text = [source, line, column].filter(Boolean).join(':')
      this.handleCopy(text)
      this.$mtd.message({ type: 'success', message: `复制成功: ${text}` })
    },
    handleCopy(text) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', text)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    },
    handleShowCode(item, row) {
      this.modalData = {
        cssArr: item.css.split('\n'),
        visible: true,
        title: ['源码', item.source].join(': '),
        selectItem: row
      }
    },
    handleChangeSort() {
      const { sortModel } = this
      if (sortModel === 1) {
        this.tableData = sortBy([...StylelintResults], ['errorCount', 'warningCount']).reverse()
      }
      if (sortModel === 2) {
        this.tableData = [...StylelintResults]
      }
      this.handleOpenCloseAll(false)
    }
  },
  created() {
    document.querySelector('#app').style.display = 'block'

    this.initStylelintResults()

    this.handleChangeSort()
  }
})
</script>

<style lang="less">
html,
body {
  margin: 0;
}
#app {
  padding: 10px;
}
a,
a:hover {
  text-decoration: none;
}
.stylelint-results {
  margin-top: 10px;
}

.mtd-card-title,
.mtd-card-body {
  padding: 10px;
}

.box-card {
  border: 0;
  border-radius: 0;
  .mtd-card-title {
    padding: 5px 3px;
    user-select: none;
    .source {
      padding-left: 20px;
    }
    .mtdicon {
      cursor: pointer;
    }
    .error-warning-count {
      float: right;
    }
    .mtdicon-check,
    .mtdicon-right,
    .mtdicon-down {
      display: none;
    }
  }

  .mtd-card-body {
    padding: 0;
    .mtdicon-code {
      font-size: 14px;
      margin-left: 4px;
    }
  }

  &.is-success .mtdicon-check {
    display: inline;
  }
  &:not(.is-success).open .mtdicon-down {
    display: inline;
  }
  &:not(.is-success).close .mtdicon-right {
    display: inline;
  }
  &.is-success .mtd-card-title {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
    cursor: default;
  }
  &.is-warning .mtd-card-title {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
  }
  &.is-error .mtd-card-title {
    background-color: #fef0f0;
    color: #f56c6c;
    border-color: #fbc4c4;
  }
  &.close .mtd-card-body {
    display: none;
  }
}

.mtd-table td {
  padding: 0;
}
.mtd-table-cell {
  padding: 5px 10px;
  line-height: 20px;
}

.mtd-button--text {
  user-select: text;
}

.code-line {
  cursor: pointer;
}

.color {
  &-success {
    color: #67c23a;
  }
  &-danger {
    color: #f56c6c;
  }
  &-warning {
    color: #e6a23c;
  }
}
.css-source-container {
  counter-reset: column;
  padding-left: 24px;
  pre {
    margin: 0;
    position: relative;
    line-height: 20px;
    min-height: 20px;
    border-left: 1px solid #e1e4e8;
    padding-left: 0.5em;
    &.highlight {
      background-color: #ffeef0;
      &::before {
        background-color: #ffeef0;
      }
    }
    &::before {
      content: counter(column);
      counter-increment: column;
      position: absolute;
      top: 0;
      left: -2.5em;
      width: 2.5em;
      padding-right: 0.5em;
      text-align: right;
    }
  }
}
.popper-class-row-text {
  max-width: 500px;
  padding: 8px 16px;
}
</style>
