module.exports = function(elt, s) {
  console.log(s);
  elt.innerHTML = '<p class="foo">' + s + '</p>';
};
