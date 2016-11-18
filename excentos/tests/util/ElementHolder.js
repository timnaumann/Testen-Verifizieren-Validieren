define([
	"doh/runner",
	"excentos/util/ElementHolder",
	"excentos/event/ElementHolderEvent"
],function(doh, ElementHolder, ElementHolderEvent){
	var holder = new ElementHolder();
	
	doh.register("excentos.util.ElementHolder", [
		{
			name: "addElement('A') #1",
			runTest: function(d) {
				holder.addElement("A");
				holder.addElement("B");
				holder.addElement("C");
				
				d.is("A,B,C", holder._elements.toString());
			}
		},
		{
			name: "addElement('X',0) #2",
			runTest: function(d) {
				holder.addElement("X",0);
				
				d.is("X,B,C", holder._elements.toString());
			}
		},
		{
			name: "addElement('A',1,false) #3",
			runTest: function(d) {
				holder.addElement("A",1, false);
				
				d.is("X,A,B,C", holder._elements.toString());
			}
		},
		{
			name: "addElements('F','G') #1",
			runTest: function(d) {
				holder.addElements(["D","E"]);
				holder.addElements("F","G");
				
				d.is("X,A,B,C,D,E,F,G", holder._elements.toString());
			}
		},
		{
			name: "addElements(['Y','Z'],1,false) #2",
			runTest: function(d) {
				holder.addElements(["Y","Z"],1,false);
				
				d.is("X,Y,Z,A,B,C,D,E,F,G", holder._elements.toString());
			}
		},
		{
			name: "removeElement('X') #1",
			runTest: function(d) {
				holder.removeElement("X");
				
				d.is("Y,Z,A,B,C,D,E,F,G", holder._elements.toString());
			}
		},
		{
			name: "removeElements(['Y','Z']) #1",
			runTest: function(d) {
				holder.removeElements(["Y","Z"]);
				
				d.is("A,B,C,D,E,F,G", holder._elements.toString());
			}
		},
		{
			name: "findElement('D') #1",
			runTest: function(d) {
				var i = holder.findElement("D");
				
				d.is(3, i);
			}
		},
		{
			name: "getElementsByPropertyValue('name','Sven') #1",
			runTest: function(d) {
				holder.addElement({name:"Sven"});
				var arr = holder.getElementsByPropertyValue("name","Sven");
				
				d.is(arr[0].name, "Sven");
			}
		},
		{
			name: "removeElements() #2",
			runTest: function(d) {
				holder.removeElements();
				
				d.is(0, holder.getLength());
			}
		}
	]);
});