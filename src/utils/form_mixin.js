export default {
  data() {
    return {
      bindModel: 'model'
    }
  },
  methods: {
    inputChange(e) {
      let that = this
      let key = e.currentTarget.dataset.key
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[model][key] = that.protectGetInputValue(e)
    },
    protectGetInputValue(e) {
      let type = e.currentTarget.dataset.type !== undefined ? e.currentTarget.dataset.type : 'string'
      let value = e.detail.value
      switch (type) {
        case 'string':
          value = value.toString()
          break
        case 'int':
          value = parseInt(value)
          break
        case 'float':
          value = parseFloat(value)
          break
      }
      return value
    },
    radioChange(e) {
      let that = this
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[model][key] = value
    },
    switchChange(e) {
      let that = this
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[model][key] = value
    },
    checkboxChange(e) {
      console.log(e)
      let that = this
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[model][key] = value
    },
    pickerChange(e) {
      let that = this
      let list = e.currentTarget.dataset.list
      let index = e.currentTarget.dataset.index
      let value = parseInt(e.detail.value)
      let key = e.currentTarget.dataset.key
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[index] = value
      that[model][key] = this[list][value]
    },
    datePickerChange(e) {
      let that = this
      let key = e.currentTarget.dataset.key
      let value = e.detail.value
      let model = e.currentTarget.dataset.hasOwnProperty('model') ? e.currentTarget.dataset.model : that['bindModel']
      that[model][key] = value
    }
  }
}