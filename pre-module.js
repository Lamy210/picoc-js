Module['noInitialRun'] = true;
const __dirname = "";
Module['print'] = (a) => { 
  console.log("Print let f 前");
  let f = Module['consoleWrite'] || console.log.bind(console);
  f(a);
  console.log("Print let f(a)後");
}
