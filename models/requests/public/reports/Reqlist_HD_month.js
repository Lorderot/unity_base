 
exports.reportCode = { 
  /** 
  * This function must be defined in report code block. 
  * 
  * Inside function you must: 
  * 1) Prepare data 
  * 2) Run method this.buildHTML(reportData); where reportData is data for mustache template 
  * 3) If need create PDF run method this.transformToPdf(htmlReport); where htmlReport is HTML 
  * 4) If is server side function must return report as string otherwise Promise or string 
  * 
  * @cfg {function} buildReport 
  * @params {[]|{}} reportParams 
  * @returns {Promise|Object} If code run on server method must return report data. 
  * Promise object must be resolved report code 
  */ 
  buildReport: function(reportParams){ 
     var result;
  var me = this
  var today = new Date(),
  curMonth = today.getMonth(),
  curYear = today.getFullYear();
  var mBegin = new Date(today.getFullYear(), today.getMonth(), 1) //Get first date of current month
  var mEnd = new Date(today.getFullYear(), today.getMonth()+1, 1) //Get first date of next month
	console.log(mBegin);
  return UB.Repository('req_reqList')
    .attrs(['reqDate', 'applicantInfo', 'reqText','answer'])
    .where('department','equal', 335784175468545) //Set your departments ID from Departmments form!!
    .where('status', 'equal', 'CLOSED') //get closed requests
    .where('reqDate', '>=', mBegin) //get requests in current month
    .where('reqDate', '<', mEnd)
    .selectAsObject()
    .then( function (resp) {
      var data = {
        data: resp,
        curMonth: curMonth + 1,
        curYear:  curYear
      };
      reportParams = data;
      console.log(reportParams);
      switch (me.reportType) {
      case 'pdf':
        console.log('Create PDF');
        result = me.buildHTML(reportParams);
        result = me.transformToPdf(result);
        break
      case 'html': 
        console.log('Create HTML');
        result = me.buildHTML(reportParams);
        break
      case 'xlsx':           
        console.log('Create XLSX');
        result = me.buildXLSX(reportParams);
        break
      }      
      return result;
    })
  } 
} 
