import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './CauhoiManage.scss';
import { Pagination } from 'antd';
import TableCH from './TableCH';
import CreateQuestion from './CreateQuestion';
import CreateAnswer from './CreateAnswer';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

function CauhoiManage() {
    const [createdQuestionData, setCreatedQuestionData] = useState([]);
    const [createdAnswerData, setCreatedAnswerData] = useState([]);
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Câu hỏi</div>
            </div>
            <div className={cx('question')}>
                <CreateQuestion setCreatedQuestionData={setCreatedQuestionData} />
                <CreateAnswer setCreatedAnswerData={setCreatedAnswerData} />
            </div>
            <div className={cx('container')}>
                
                <TableCH questionData={createdQuestionData} answerData={createdAnswerData} />
            </div>
            <div className={cx('footer')}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </LayoutAdmin>
    );
}

export default CauhoiManage;
