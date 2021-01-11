<template>
  <div id="element-embed">
    <div v-if="configuration.element && configuration.element.server" id="element-frame-container">
      <iframe id="element-frame" :src="configuration.element.server"></iframe>
    </div>
    <div v-if="!configuration.element || !configuration.element.server">
      {{$gettext('Unfortunately Element was not configured correctly.')}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'ElementFrame',
  data: () => ({
    configuration: window.phoenixConfig || []
  })
}
</script>
<style scoped>
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
