<template>
  <div class="stepper">
    <div class="stepper-iMinus" :class="{disabled: iValue <= iMin}" @click="iMinusValue">
      <div class="stepper-iMinus__before"></div>
    </div>
    <input class="stepper-input" :value="iValue" @input="bindStepperInput" type="number"/>
    <div class="stepper-plus" @click="plusValue" :class="{disabled: iValue >= iMax}">
      <div class="stepper-plus__before"></div>
      <div class="stepper-plus__after"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "stepper",
    props: {
      value: {
        type: Number,
        required: false,
        default: 1
      },
      min: {
        type: Number,
        required: false,
        default: 1,
      },
      max: {
        type: Number,
        required: false,
        default: 999
      }
    },
    data() {
      return {
        iValue: this.value,
        iMin: this.min,
        iMax: this.max
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      iMinusValue() {
        let that = this
        that.iValue <= that.iMin || that._setValue(that.iValue - 1)
      },
      plusValue() {
        let that = this
        that.iValue >= that.iMax || that._setValue(that.iValue + 1)
      },
      bindStepperInput(event) {
        let that = this
        let iValue = parseInt(event.detail.iValue)
        iValue = isNaN(iValue) ? that.iMin : iValue
        iValue = iValue <= that.iMin ? that.iMin : iValue
        iValue = iValue >= that.iMax ? that.iMax : iValue
        that._setValue(iValue)
      },
      _setValue(iValue) {
        let that = this
        that.iValue = iValue
        that.$emit('change', iValue)
      }
    },
  }
</script>

<style scoped>
  .stepper{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .stepper-iMinus, .stepper-plus{
    width: 40px;
    height: 30px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #FF4444;
    position: relative;
    padding: 5px;
    vertical-align: middle;
  }

  .stepper-iMinus.disabled, .stepper-plus.disabled{
    background-color: rgba(255, 68, 68, .11);
  }

  .stepper-iMinus__before,.stepper-iMinus__after,.stepper-plus__before,.stepper-plus__after{
    content: '';
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FF4444;
  }

  .stepper-iMinus{
    border-radius: 2px 0 0 2px;
  }

  .stepper-input{
    width: 33px;
    height: 30px;
    padding: 1px;
    border: 1px solid #FF4444;
    border-width: 1px 0;
    border-radius: 0;
    box-sizing: border-box;
    color: #FF4444;
    background-color: #FFFFFF;
    font-size: 14px;
    vertical-align: middle;
    text-align: center;
    -webkit-appearance: none;
    iMin-height:unset;
  }

  .stepper-plus{
    border-radius: 0 2px 2px 0;
  }

  .stepper-iMinus__before, .stepper-plus__before {
    width: 9px;
    height: 1px;
  }

  .stepper-plus__after {
    width: 1px;
    height: 9px;
  }
</style>