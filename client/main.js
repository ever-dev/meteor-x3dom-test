import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

import "./main.html";

const boxes = [];

function getRandomColor() {
  var letters = "0123456789abcdef";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

Template.x3dom.onCreated(function() {
  this.boxes = new ReactiveVar(boxes);
});
Template.x3dom.helpers({
  boxes: function() {
    return Template.instance().boxes.get();
  },
  counter: function() {
    return Template.instance().boxes.get().length;
  }
});

Template.x3dom.events({
  "mouseup shape": function(e) {
    if (e.button === 1) {
      boxes.push({
        color: getRandomColor(),
        x: Math.floor(e.worldX + e.normalX / 2) + 0.5,
        y: Math.floor(e.worldY + e.normalY / 2) + 0.5,
        z: Math.floor(e.worldZ + e.normalZ / 2) + 0.5
      });
      Template.instance().boxes.set(boxes);
    }
  }
});
