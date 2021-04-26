<template>
	<v-card :color="'primary'" dark>
		<v-list-item>
			<v-list-item-avatar color="#26c6da">
				<v-btn
				color="secondary"
				fab
				x-small
				dark
				@click="iconBtn" 
				:loading="isLoading"
				>
					<v-icon>mdi-account</v-icon>
				</v-btn>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title v-if="fullname">{{fullname | capitalize}}</v-list-item-title>
				<v-list-item-title v-else>-SIN NOMBRE-</v-list-item-title>
				<v-list-item-subtitle v-if="fullname">{{dni}}</v-list-item-subtitle>
				<v-list-item-subtitle v-else>-SIN RUT-</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
	import capitalize from '@/filters/capitalize';

	export default {
		name: 'PersonCard',
		props: {
			fullname: {
				type: String,
				required: false,
			},
			dni: {
				type: String,
				required: false,
			},
			isLoading: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		data: () => ({
			reveal: {
				phonesView: false,
				emailsView: false,
			},
		}),
		filters: {
			capitalize,
		},
		methods: {
			iconBtn() {
				this.$emit('iconBtn');
			},
		},
	};
</script>

<style scoped>
</style>