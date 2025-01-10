<script lang="ts" setup>

	let dataTypes: Array<string> = new Array<string>();
	dataTypes.push("Petit-déjeuner");
	dataTypes.push("Déjeuner");
	dataTypes.push("Apéro");
	dataTypes.push("Souper");

	const startDate = ref<Date>(new Date());
	if (startDate.value.getDay() === 0) {
		startDate.value.setDate(startDate.value.getDate() - 6);
	} else {
		startDate.value.setDate(startDate.value.getDate() - startDate.value.getDay() + 1);
	}

	const dates = ref<Array<Date>>(new Array<Date>())
	const InitDateRange = () => {
		dates.value = [];
		for (let i = 0; i < 7; i++) {
			const date: Date = new Date(startDate.value.getTime());

			date.setDate(date.getDate() + i);

			dates.value.push(date);
		}
	}

	InitDateRange();

	const GetDayName = (date: Date) => {
		return date.toLocaleDateString("FR", { weekday: 'long' }).substring(0, 3);
	};

	const PreviousDateRange = () => {
		startDate.value.setDate(startDate.value.getDate() - 7);
		InitDateRange();
	}

	const NextDateRange = () => {
		startDate.value.setDate(startDate.value.getDate() + 7);
		InitDateRange();
	}
</script>

<template>
	<div class="planner border">
		<div class="plannerMain">
			<div class="plannerHeader border">
				<div class="previousDateRange">
					<UTooltip text="Semaine précédente">
						<UButton icon="material-symbols:arrow-back-ios-rounded" @click="PreviousDateRange"/>
					</UTooltip>
				</div>
				<div class="plannerDateRange">
					<div class="plannerDate" v-for="(date, index) in dates">
						<UTooltip :text="date.toLocaleDateString()">
							<UButton disabled>
								{{
									GetDayName(date) + ". " + date.getDate().toString()
								}}
							</UButton>
						</UTooltip>
					</div>
				</div>
				<div class="nextDateRange">
					<UTooltip text="Semaine suivante">
						<UButton icon="material-symbols:arrow-forward-ios-rounded" @click="NextDateRange"/>
					</UTooltip>
				</div>
			</div>
			<div class="plannerBody border">
				<div class="plannerType">
					<div class="plannerDataType" v-for="(dataType, index) in dataTypes">
						{{
							dataType
						}}
					</div>
				</div>
				<div class="plannerGrid">
					<div class="plannerRow" v-for="(dataType, index) in dataTypes">
						<div class="plannerCell" v-for="(date, index) in dates">
							<UTooltip text="Choisir une recette">
								<UButton icon="material-symbols:add-2-rounded" variant="ghost" />
							</UTooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="plannerSide">

		</div>
	</div>
</template>

<style lang="scss">
	.planner {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		padding: 5px;

		> .plannerMain {
			display: flex;
			flex-direction: column;
			width: 80%;

			> .plannerHeader {
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 10%;
				padding: 5px;
				justify-content: space-between;
				align-items: center;

				> .previousDateRange {
					display: flex;
					justify-content: right;
					width: 20%;
					height: 52px;
				}

				> .nextDateRange {
					display: flex;
					justify-content: left;
					width: 20%;
					height: 52px;
				}

				> .plannerDateRange {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-around;
					width: 60%;

					> .plannerDate {
						width: 52px;

						> * , > * > button {
							width: inherit;
							justify-content: center;
						}
					}

					/*> .plannerDate:not(:last-child) {
						border-right: 1px solid #444;
					}*/
				}
			}

			> .plannerBody {
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 90%;
				padding: 5px;

				> .plannerType {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 20%;

					> .plannerDataType {
						display: flex;
						align-items: center;
						height: 52px;
					}
				}

				> .plannerGrid {
					display: flex;
					flex-direction: column;
					width: 60%;

					> .plannerRow {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						height: 52px;

						> .plannerCell {
							display: flex;
							width: 52px;
							justify-content: center;
						}

						/*> .plannerCell:not(:last-child) {
							border-right: 1px solid #444;
						}*/
					}

					/*> .plannerRow:not(:last-child) {
						border-bottom: 1px solid #444;
					}*/
				}
			}
		}

		> .plannerSide {
			width: 20%;
		}
	}

	.planner.border, .planner .border {
		outline: 1px solid #444;
		border-radius: 5px;
	}

	.planner button {
		transition: background-color 0.3s;
	}
</style>
