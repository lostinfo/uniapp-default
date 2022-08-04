const state = () => ({
  systemInfo: null,
})

const getters = {}

const actions = {}

const mutations = {
  setSystemInfo(state, systemInfo) {
    state.systemInfo = systemInfo
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
