<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#' + link"></use>
    </svg>
</template>
<script>
/**
 * sample:
 * <m-icon link="icon-close"></m-icon>
 */
export default {
    name: 'm-icon',
    props: ['link']
};
</script>
