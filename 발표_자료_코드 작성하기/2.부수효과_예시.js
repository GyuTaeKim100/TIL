
increaseBtn.addEventListener('click', () => {
    // 서버로 POST 요청을 보냄
    fetch('/increase', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DB 값 증가 결과:', data);
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  });

  