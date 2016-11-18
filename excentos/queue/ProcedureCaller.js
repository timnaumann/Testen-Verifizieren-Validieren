define([
	"dojo/_base/kernel",
	"./ProcedureInvoker"
], function(kernel, ProcedureInvoker){
	kernel.deprecated("excentos/queue/ProcedureCaller", "use excentos/queue/ProcedureInvoker instead");
	return ProcedureInvoker;
});
