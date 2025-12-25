
const itemsSelector = 'li.ipc-metadata-list-summary-item';
let counter = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  while (true) {

    let removedCount = 0;
    counter++;

    if (counter > 1 && counter % 20 === 0) {
      console.log('Running removal process...');
      const items = document.querySelectorAll(itemsSelector);
      items.forEach((item, index) => {
        // log indexed item
        console.log(`Processing item ${index + 1}`);

        // Tìm thẻ <span class="ipc-btn__text">
        const spanWatched = item.querySelector('span.ipc-btn__text');
        if (spanWatched && spanWatched.textContent.trim() === 'Watched') {
          item.remove();
          removedCount++;
          return; // Bỏ qua kiểm tra tiếp theo nếu đã xóa
        }

        const numberVoteText = item.querySelector('span.ipc-rating-star--voteCount').innerText;
        const numberRatingText = item.querySelector('span.ipc-rating-star--rating').innerText; // 0.0 to 10.0


        let numberVote = 0;
        let userRating = 0;

        if (numberVoteText.includes('K')) {
          numberVote = parseFloat(numberVoteText.replace(/[()K]/g, '')) * 1000;
        } else if (numberVoteText.includes('M')) {
          numberVote = parseFloat(numberVoteText.replace(/[()M]/g, '')) * 1_000_000;
        } else {
          numberVote = parseFloat(numberVoteText.replace(/[()]/g, ''));
        }

        userRating = parseFloat(numberRatingText);


        // Tìm thẻ chứa điểm số
        const scoreSpan = item.querySelector(
          'span.sc-9fe7b0ef-0.hDuMnh.metacritic-score-box'
        );

        if (!scoreSpan && userRating < 7.5) {
          // Nếu không có score span -> remove luôn
          item.remove();
          removedCount++;
          return;
        }

        if (scoreSpan) {
          const metaScore = parseInt(scoreSpan.textContent.trim(), 10);
          if ((!isNaN(metaScore) && metaScore < 40) || scoreSpan.textContent.trim() === '' || userRating < 5.0) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 200000 && metaScore < 50) || (!isNaN(metaScore) && numberVote < 200000 && userRating < 6.0)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 150000 && metaScore < 55) || (!isNaN(metaScore) && numberVote < 150000 && userRating < 6.1)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 100000 && metaScore < 60) || (!isNaN(metaScore) && numberVote < 100000 && userRating < 6.2)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 75000 && metaScore < 65) || (!isNaN(metaScore) && numberVote < 75000 && userRating < 6.3)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 50000 && metaScore < 70) || (!isNaN(metaScore) && numberVote < 50000 && userRating < 6.4)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 25000 && metaScore < 75) || (!isNaN(metaScore) && numberVote < 25000 && userRating < 6.5)) {
            item.remove();
            removedCount++;
            return;
          }
          if ((!isNaN(metaScore) && numberVote < 15000 && metaScore < 80) || (!isNaN(metaScore) && numberVote < 15000 && userRating < 6.6)) {
            item.remove();
            removedCount++;
            return;
          }
        }
      });
    }

    const remainingItems = document.querySelectorAll(itemsSelector).length;

    console.log(counter, '---', removedCount, '---', remainingItems, '---', 4000 + counter * 50);

    const btn = document.querySelector('.ipc-see-more__button');
    if (btn) btn.click();

    await sleep(4000 + counter * 50);
  }
}

run();
