function expHtml(printList) {
  function beginImageList() {
    return '<table style="width:550px;margin:0 auto;">';
  }
  function endImageList() {
    return "</table>";
  }
  function newImageLine() {
    return "<tr>";
  }
  function endImageLine() {
    return "</tr>";
  }
  function addImage(base64Image, hint, imageClass) {
    return (
      '<td><div class=""><image class="' +
      imageClass +
      '" src="' +
      base64Image +
      '" /><p class="imageP">' +
      hint +
      "</p></div></td>"
    );
  }
  function addString(value) {
    return value;
  }
  function ListToHtml(headcss, lists) {
    var liststr = "";
    lists.forEach((value, index) => {
      liststr += value;
    });
    lists.toString();
    return (
      "<html>" +
      headcss +
      '<body><div style="margin:0 auto;">' +
      liststr +
      "</div></body></html>"
    );
  }
  function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  }
  function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
  }
  var lists = [];
  var headcss =
    '<head><meta charset="UTF-8"><style type="text/css"> img{ border: 1px;solid #ddd;border-radius: 4px;padding: 5px; width: 250px;height:250px}';
  headcss +=
    "@media print{@page {size: A4;}} @media screen{ .main{display: none;}}";
  headcss += " .divCenter{margin: 0 auto;}";
  headcss += " .imageP{text-align:center;}";
  headcss += " </style></head>";
  lists.push(addString('<div align="center"><h2>打印报告</h2></div>'));
  lists.push(beginImageList());
  lists.push(newImageLine());
  for (let index = 0; index < printList.length; index++) {
    lists.push(
      addImage(
        printList[index].img,
        printList[index].created,
        printList[index].description
      )
    );
    if (index % 2 == 1) {
      lists.push(endImageLine());
      lists.push(newImageLine());
    }
  }
  lists.push(endImageList());
  var data = ListToHtml(headcss, lists);
  exportRaw("打印.html", data);
}
