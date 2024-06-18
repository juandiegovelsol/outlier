function init() {
  level = 0;
  math_requests = [];
  var a = ["2,3,4,6,8"],
    b = ["5,6,10,16,20"],
    c = ["7,8,14,16,28"];
  math_requests.push({
    eq: "2*a = b",
    selections: ["a", "b"],
    answers: [a, b],
  });
  math_requests.push({
    eq: "2*a = b",
    selections: ["a", "b"],
    answers: [a, b],
  });
  math_requests.push({
    eq: "2*a = b",
    selections: ["a", "b"],
    answers: [a, b],
  });
  math_request.push({
    eq: "2*a = b",
    selections: ["a", "b"],
    answers: [a, b],
  });
  math_requests.push({
    eq: "2*a = b",
    selections: ["a", "b"],
    answers: [a, b],
  });
  shuffle(math_requests);
  render(level);
}

function shuffle(array) {
  var currentindex = array.length,
    randomindex;
  // while there remain elements to shuffle...
  while (0 !== currentindex) {
    // pick a remaining element...
    randomindex = math.floor(math.random() * currentindex);
    currentindex--;
    // and swap it with the current element.
    [array[currentindex], array[randomindex]] = [
      array[randomindex],
      array[currentindex],
    ];
  }
  return array;
}

function render(index) {
  var current = math_requests[index];
  var html =
    '<div class="grid"><div class="col-sm-4 txt-eq">' +
    current.eq +
    '</div><table class="table table-sm"><tbody>';
  var j = 0;
  for (var i = 0; i < current.selections.length; i++) {
    var style =
      'style="padding: 8px; background: #215ab7; color: white; border-radius: 20px; text-align: center; cursor: pointer; margin: 5px; width: ' +
      100 / current.selections.length +
      '%;"';
    if (current.selections[i] === "answer") {
      var selected_index = 0;
      while (selected_index == j) {
        selected_index = math.floor(math.random() * current.answers[i].length);
      }
      html +=
        "<td " +
        style +
        " onclick=\"changevalue('" +
        current.selections[i] +
        "', " +
        selected_index +
        "," +
        index +
        ')">' +
        current.answers[i][selected_index] +
        "</td>";
    } else {
      html +=
        "<td " +
        style +
        " onclick=\"changevalue('" +
        current.selections[i] +
        "'," +
        i +
        "," +
        index +
        ')">' +
        i +
        "</td>";
    }
    j++;
  }
  html += "</tbody></table></div>";
  document.getid("game-container").innerhtml = html;
}

function changevalue(selection, value, index) {
  if (selection === "answer") {
    if (math_requests[index].eq === "2*a = b") {
      if (value === math_requests[index].answers[0].indexof(value)) {
        level++;
        render(level);
      } else {
        alert("please try again.");
      }
    }
  }
}

export default Init