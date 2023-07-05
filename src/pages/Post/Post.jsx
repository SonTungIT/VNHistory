import classNames from 'classnames/bind';
import styles from './Post.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';

const cx = classNames.bind(styles);

function Post() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNumberQuestion, setSelectedNumberQuestion] = useState('');
  const [selectedTime, setSelectedTime] = useState(0);
  const [quizId, setQuizId] = useState('');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleQuizSelection = async (numberQuestion, time) => {
    setSelectedNumberQuestion(numberQuestion);
    setSelectedTime(time);

    try {
      const loginResponse = await axios.post('https://vietnam-history.azurewebsites.net/api/Auth/login', {
        email: 'cong123@gmail.com',
        password: '123456'
      });
      const accessToken = loginResponse.data.accessToken;

      // Sử dụng mã thông báo truy cập để gửi yêu cầu API với phân quyền Editor
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const answerData = {
        eventId: "1",
        numberQuestion: numberQuestion,
        time: time
      };
      // Make the API request to create a quiz
      const response = await axios.post(`https://vietnam-history.azurewebsites.net/api/Quizees/createQuiz?eventId=${answerData.eventId}`, answerData, config);

      

      const createdQuizId = response.data.data.quizId; // Get the quizId from the response data

    console.log('Quiz created:', response);
    console.log('Quiz ID:', createdQuizId);

      // Chuyển hướng đến trang Quiz10 và truyền quizId vào URL
      window.location.href = `/Quiz10?quizId=${encodeURIComponent(createdQuizId)}`;
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className={cx('wapper')}>
      <div className={cx('inner')}>
        <div className={cx('content')}>
          <div className={cx('title')}>
            <div className={cx('title-post')}>Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt</div>
            <p className={cx('title-date')}>20-12-2022</p>
          </div>
          <div className={cx('poster')}>
            <img src="https://giasuviet.com.vn/wp-content/uploads/2015/09/phuong-phap-hoc-mon-lich-su-lop-12-hieu-qua-va-nho-lau.jpg" alt="img" />
          </div>
          <div className={cx('detail-post')}>
            Thời kỳ Hồng Bàng theo truyền thuyết và dã sử cho rằng bắt đầu từ năm 2879 TCN, là niên đại của Kinh Dương Vương, với quốc hiệu Xích Quỷ. Lãnh thổ của quốc gia dưới thời Kinh Dương vương rộng lớn, phía bắc tới sông Dương Tử (cả vùng hồ Động Đình), phía nam tới nước Hồ Tôn (Chiêm Thành), phía đông là Đông Hải (một phần của Thái Bình Dương), phía tây là Ba Thục (Tứ Xuyên, Trung Hoa ngày nay). Về sau người Việt chỉ thấy có ở miền Bắc Việt Nam ngày nay, có thể một phần do sự lấn áp của các tộc người Hoa Hạ từ phương Bắc.
          </div>
          <div className={cx('dropdown')}>
            <button className={cx('btn')} type="button" onClick={handleDropdownToggle}>
              Quiz
            </button>
            {isDropdownOpen && (
              <ul className={cx('dropdown-menu')}>
                <div className={cx('quiz')}>
                  <div className={cx('title-quiz')}>Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt</div>
                  <div className={cx('establish-quiz')}>Thiết lập bài kiểm tra</div>
                  <div className={cx('number-quiz')}>Câu hỏi (tối đa) - Thời gian</div>
                  <div className={cx('btn-quiz')}>
                    <Link to={`/Quiz10?quizId=${(quizId)}`}>
                      <button className={cx('btn-quiz10')} onClick={() => handleQuizSelection('10', 135)}>
                        10 câu - 135 giây
                      </button>
                    </Link>
                      <button className={cx('btn-quiz20')} onClick={() => handleQuizSelection('20', 270)}>
                        20 câu - 270 giây
                      </button>
                  </div>
                </div>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
