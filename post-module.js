function runc(cstr, consoleWrite) {
  
  Module['consoleWrite'] = consoleWrite;
  console.log("Module['consoleWrite'] = consoleWrite;");
  FS.writeFile("file.c", cstr);
  callMain(["file.c"]);
  console.log("return FS.readFile(file.c)前");
  return FS.readFile("file.c");
  
}

Module['runc'] = runc;
