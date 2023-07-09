import LayoutAdmin from '~/pages/Admin/LayoutAdmin';
import classNames from 'classnames/bind';
import styles from './CauhoiManage.scss';
import { Pagination } from 'antd';
import TableCH from './TableCH';
import CreateQuestion from './CreateQuestion';
import CreateAnswer from './CreateAnswer';
import React, { useState } from 'react';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { AddIcon } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';

const cx = classNames.bind(styles);

function CauhoiManage() {
    const [createdQuestionData, setCreatedQuestionData] = useState([]);
    const [createdAnswerData, setCreatedAnswerData] = useState([]);
    return (
        <LayoutAdmin>
            <div className={cx('header')}>
                <div>Câu hỏi</div>
                <Button primary leftIcon={<AddIcon />} to={config.routes.CreateQuestion} setCreatedQuestionData={setCreatedQuestionData}>
                        THÊM MỚI QUESTION
                </Button>
                {/* <Button primary leftIcon={<AddIcon />} to={config.routes.CreateAnswer} setCreatedAnswerData={setCreatedAnswerData}>
                        THÊM MỚI ANSWER
                </Button> */}
            </div>
            <div className={cx('question')}>
                {/* <CreateQuestion setCreatedQuestionData={setCreatedQuestionData} />
                <CreateAnswer setCreatedAnswerData={setCreatedAnswerData} /> */}
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
