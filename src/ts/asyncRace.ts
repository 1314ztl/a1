export default function raceAsync(asyncFunc, paramsArray, onRaceCompleted, threshold) {
    return new Promise((resolve) => {
      const results = [];
      let hasRaceCompleted = false;
      let isResolved = false;
  
      // 处理结果并检查解析条件
      const handleResult = (result) => {
        results.push(result);
        
        // 首次完成时触发竞速回调
        if (!hasRaceCompleted) {
          hasRaceCompleted = true;
          onRaceCompleted(result);
        }
  
        // 达到阈值立即解析
        if (!isResolved && results.length >= threshold) {
          isResolved = true;
          resolve([...results]);
        }
      };
  
      // 创建所有异步任务
      const promises = paramsArray.map(param => 
        asyncFunc(param)
          .then(value => ({ status: 'fulfilled', value }))
          .catch(reason => ({ status: 'rejected', reason }))
          .then(handleResult)
      );
  
      // 最终兜底处理
      Promise.allSettled(promises).then(() => {
        if (!isResolved) {
          resolve([...results]);
        }
      });
    });
  }