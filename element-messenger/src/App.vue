<template>
  <div id="element-embed">
    <div v-if="apps['meta']['element-messenger'] && apps['meta']['element-messenger']['config'] && apps['meta']['element-messenger']['config']['server']" id="element-frame-container">
      <iframe id="element-frame" :src="apps['meta']['element-messenger']['config']['server']"></iframe>
    </div>
    <div v-if="!apps['meta']['element-messenger'] || !apps['meta']['element-messenger']['config'] || !apps['meta']['element-messenger']['config']['server']">
      {{$gettext('Unfortunately Element was not configured correctly.')}}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['apps'])
  }
}
</script>
<style scoped>
#element-embed {
  height: 100%;
  width: 100%;
}

#element-frame-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#element-frame {
  width: 100%;
  height: 100%;
}
</style>
