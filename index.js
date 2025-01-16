import PicocModule from './picoc';

// Node.js環境とブラウザ環境の差異を吸収するラッパー
const getEnvironment = () => {
  if (typeof window !== 'undefined') {
    return 'browser';
  }
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    return 'node';
  }
  return 'unknown';
};

export function runC(cprog, consoleWrite=null) {
  const environment = getEnvironment();
  
  // 環境固有の初期化処理
  const initializeEnvironment = () => {
    if (environment === 'browser') {
      // ブラウザ環境固有の初期化
      return PicocModule();
    } else {
      // Node.js環境固有の初期化
      return PicocModule();
    }
  };
  console.log("ver0.9");
  console.log("const pc 前");
  const pc = initializeEnvironment();
  console.log("const pc 後");
  
  pc.onRuntimeInitialized = () => {
    console.log("pcrunc");
    pc.runc(cprog, consoleWrite);
  };
}