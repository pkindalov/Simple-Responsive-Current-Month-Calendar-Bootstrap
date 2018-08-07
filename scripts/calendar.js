function getCurrentMonthName(month){
	switch(month){
		case 1:
			return 'January'
		case 2:
			return 'February'
		case 3:
			return 'March'
		case 4:
			return 'April'
		case 5:
			return 'May'
		case 6:
			return 'June'
		case 7:
			return 'July'
		case 8:
			return 'August'
		case 9:
			return 'September'
		case 10:
			return 'October'
		case 11:
			return 'November'
		case 12:
			return 'December'
		default:
			return 'Error with month name'							 						
	}
}


function whereToPutFirstDate(firstDayOfMont){
	switch(firstDayOfMont){
			case 'Mon':
				return 0
			case 'Tue':
				return 1
			case 'Wed':
				return 2
			case 'Thu':
				return 3
			case 'Fri':
				return 4	
			case 'Sat':
				return 5
			case 'Sun':
				return 6
			default:
				return 0						
		}
}


function countEmptyCellsDrawEnd(lastDayOfMont){
	switch(lastDayOfMont){
			case 'Mon':
				return 6
			case 'Tue':
				return 5
			case 'Wed':
				return 4
			case 'Thu':
				return 3
			case 'Fri':
				return 2	
			case 'Sat':
				return 1
			case 'Sun':
				return 0
			default:
				return 0		
		}

}


//helping functions for drawCalendar
function drawWeekDaysName(calendarTable, weekDays){
	for(let dayName = 0; dayName < 7; dayName++){
			calendarTable += '<th>' + weekDays[dayName] + '</th>'
			
		}

		calendarTable += '</tr>'
		calendarTable += '<tr>'

		return calendarTable
}


function drawEmptyCells(d, fromWhichPosStartNums, calendarTable, prevMonthDays){
	let start = prevMonthDays - fromWhichPosStartNums + 1

	if (d < fromWhichPosStartNums) {
				calendarTable += '<td class="emptyCells">' + start + '</td>'
		}


	return calendarTable	
}



function drawDays(d, fromWhichPosStartNums, currentDay, calendarTable){
	if(d  >= fromWhichPosStartNums){
		if(d === currentDay + fromWhichPosStartNums - 1){
			calendarTable += '<td class="today">' + (d - fromWhichPosStartNums + 1) + '</td>'

			} else {
					calendarTable += '<td>' + (d - fromWhichPosStartNums + 1) + '</td>'	
			}
	}

	return calendarTable
}



function createNewTableRow(d, calendarTable){
	if((d + 1) % 7  === 0){
		calendarTable += '</tr>'
	}

	return calendarTable
}



function addEmptyCellOnEndOfCalendar(d, fromWhichPosStartNums, howMuchEmptyCellInTheEnd, calendarTable, days){
	if(d === days + fromWhichPosStartNums - 1){
		for(let a = 0; a < howMuchEmptyCellInTheEnd; a++){
			calendarTable += '<td class="emptyCells">' + (a + 1) + '</td>'
		}
	}

	return calendarTable
}



function drawRestOfDays(days, fromWhichPosStartNums, calendarTable, currentDay, howMuchEmptyCellInTheEnd, prevMonthDays){
	for(let d = 0; d < days + fromWhichPosStartNums; d++){

			//if current index of for loop is less than the position from where we must start to draw,
			//then draw an empty cols. For example if the first day is wednesday, form weekDays array, wednesday
			//is on position 2 and if current iteration on top for is on position 0 or 1 then we draw empty cell
			//and when we are on wednesday index, which is 2, from then we begin to write rest of the days.
			calendarTable = drawEmptyCells(d, fromWhichPosStartNums, calendarTable, prevMonthDays)
			prevMonthDays++


			//from where to start fill td , example from wednesday - monday - pos[0], tuesd - pos[1], 
			//wednesd - pos[2]...
			calendarTable = drawDays(d, fromWhichPosStartNums, currentDay, calendarTable)

			

			//when go to the last index then to make new table row
			calendarTable = createNewTableRow(d, calendarTable)
			

			
			//when go to the last month day for example 31 and if 31 is Monday, that mean it must add 6
			//empty cell in the end of calendar just to look symmetric and more beautiful. Next function
			//just draw the necessary empty cells on the last row of the calendar.
			calendarTable = addEmptyCellOnEndOfCalendar(d, fromWhichPosStartNums, howMuchEmptyCellInTheEnd, calendarTable, days)

		}	

		return calendarTable
}




function drawCalendar(weekDays, fromWhichPosStartNums, howMuchEmptyCellInTheEnd, currentDay, days, currentMonthName, prevMonthDays){
		//Initialize new table and first row
		let calendarTable = '<table id="calendar" class="table table-striped">'
		calendarTable += '<tr>'
		calendarTable += '<tr><th colspan="7">' + currentMonthName + '</th></tr>'

		//drawWeekDays - write first row name of days, eg.. Mon, Tue, Wed, Thu etc...
		calendarTable = drawWeekDaysName(calendarTable, weekDays)
		calendarTable = drawRestOfDays(days, fromWhichPosStartNums, calendarTable, currentDay, howMuchEmptyCellInTheEnd, prevMonthDays)

		calendarTable += '</table>'
		$(calendarTable).appendTo(calendarCont)
}






$(document).ready(function(){
		
		//initial settings 
		let date = new Date()
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		let daysStr = new Date(year, month, 0) + ""
		let prevMonthDaysStr = new Date(year, month - 1, 0) + ""
		let days = Number(daysStr.split(" ")[2])
		let prevMonthDays = Number(prevMonthDaysStr.split(" ")[2])
		let firstDayOfMontStr = new Date(year, month - 1, 1) + ""
		let firstDayOfMont = firstDayOfMontStr.split(" ")[0]
		let currentDay = date.getDate()
		let lastDayOfMont = daysStr.split(" ")[0]
		let currentMonthName = getCurrentMonthName(month)
		
		

		let weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		let fromWhichPosStartNums = 0

		//getting which position is the first date to know from where to begin put numbers
		//example if first date of the month is wednesday, that mean we begin to draw cols from wednesday 
		//which index is 2 from the array on top - weekdays. If the first is Friday, we must begin draw 
		//from index 4 etc..
		fromWhichPosStartNums = whereToPutFirstDate(firstDayOfMont)


		//getting how many empty cells are availabe after last day of the month. For example if the last day
		//of the month is in Monday that mean that we must draw 6 empty cols just table to look more symmetric
		//the following function reveive which date(name of day) is the last day and return how many empty
		//cols we must draw to look our table symmetric.
		let howMuchEmptyCellInTheEnd = countEmptyCellsDrawEnd(lastDayOfMont)

		
		//beginning to draw table
		drawCalendar(
			weekDays, 
			fromWhichPosStartNums, 
			howMuchEmptyCellInTheEnd,
			currentDay, 
			days, 
			currentMonthName,
			prevMonthDays
		)

		

	})
