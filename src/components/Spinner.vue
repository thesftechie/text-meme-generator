<template>
	<div :class="isSpinning ? overlayClass : ''">
		<template v-if="isSpinning">
			<div :class="spinnerContainerClass">
				<div
					:class="spinnerClass"
					role="status"
					:style="spinnerStyle"
				></div>
			</div>
		</template>
		<slot name="content"></slot>
	</div>
</template>
<script>
export default {
	props: {
		spin: { type: Boolean, default: false }
	},
	computed: {
		isSpinning() {
			return this.spin
		}
	},
	data() {
		return {
			spinnerClass: 'spinner-grow text-primary',
			overlayClass: 'overlay',
			spinnerContainerClass:
				'd-flex justify-content-center position-absolute start-50 top-50',
			spinnerStyle: 'width: 3rem; height: 3rem; z-index: 20'
		}
	}
}
</script>
<style scoped>
.overlay {
	width: 100%;
	height: 100%;
	z-index: 1000;
	margin: auto;
	opacity: 0.7;
	padding-top: 5%;
}
</style>
