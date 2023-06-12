function populatePortInfo(portInfoUrl) {
  fetch(portInfoUrl)
    .then((response) => response.json())
    .then((data) => {
      
      let tableBody;
      
      if (data.schedules.length > 0) {
        tableBody = data.schedules.map((schedule) => {
          const startDate = new Date(schedule.actual_start);
          const endDate = new Date(schedule.actual_end);
          const updatedOnDate = new Date(schedule.updated_on);

          const startMonthDay = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
          const endMonthDay = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
          const updatedOnMonthDay = `${updatedOnDate.getMonth() + 1}/${updatedOnDate.getDate()}`;

          const operator = schedule.service_id ? schedule.service_id[0].operator : "N/A"; // Handling service_id being null
          const status = schedule.in_progress ? '<td><div class="badge badge-opacity-warning">In progress</div></td>' : '<td><div class="badge badge-opacity-success">Completed</div></td>';
          const delay = schedule.is_late ? '<td><label class="badge badge-danger">Delay</label></td>' : '<td></td>';
  
            
          return `<tr>
            <td>${schedule.name}</td>
            <td>${startMonthDay}</td>
            <td>${endMonthDay}</td>
            ${delay}
            <td>${schedule.next_stop}</td>
            <td>${schedule.teu}</td>
            <td>${operator}</td> 
            ${status}
            <td>${updatedOnMonthDay}</td>
          </tr>`;
        }).join('');
      } else {
        // In case there is no schedule data
        tableBody = `<tr><td colspan="9" class="text-center">진행 중인 스케줄이 없습니다.</td></tr>`;
      }

      let tableElement = document.getElementById('scheduleTable');
      tableElement.getElementsByTagName('tbody')[0].innerHTML = tableBody;

      // Initialize DataTables with pagination (10 rows per page)
      $(tableElement).DataTable({
        "pageLength": 10,
        "destroy": true // This allows the table to be reinitialized if needed.
      });
    })
    .catch((error) => console.error('Error:', error));
}
