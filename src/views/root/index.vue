<template>
  <div class="root">
     <blog-content />
  </div>
</template>

<script>
import blogContent from '@/views/content'
export default {
  name: 'app',
  components: {
    blogContent
  }
}
</script>
