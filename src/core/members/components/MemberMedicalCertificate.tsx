import React from 'react';
import { useTranslation } from 'react-i18next';
import { App, Col, Form, FormInstance, Row, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { MemberDetailFragment } from '../../../generated/graphql';
import { DatePicker } from '../../../components';

type Props = {
  member: MemberDetailFragment;
  form: FormInstance<any>;
};

const MemberMedicalCertificate: React.FC<Props> = ({ member, form }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item name={['medicalCertificate', 'attachment']} label="certificate" valuePropName="file">
            <Upload.Dragger
              name="file"
              customRequest={({ onSuccess }) => {
                onSuccess!('ok');
              }}
              accept="image/*, application/pdf"
              beforeUpload={(file) => {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onloadend = (e) => {
                  form.setFieldValue(['medicalCertificate', 'attachment'], reader.result);
                };

                return false;
              }}
              listType="picture"
              maxCount={1}
              onChange={(info) => {
                if (info.file.status === 'done') {
                  // TODO: translate
                  message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                  // TODO: translate
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              {/* TODO: translate */}
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                {/* TODO: translate */}
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                files.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name={['medicalCertificate', 'expireAt']}>
            <Form.Item
              label={t('expireAt')}
              name={['medicalCertificate', 'expireAt']}
              rules={[{ required: true, message: t('validations.required') }]}
              getValueProps={(v: number) => {
                if (v) {
                  return { value: new Date(v) };
                }
                return { value: undefined };
              }}
              getValueFromEvent={(v: Date) => {
                if (v) {
                  return v.getTime();
                }
                return null;
              }}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      {/* TODO: preview per PDF */}
      {/* { member.medicalCertificate && member.medicalCertificate.attachment && <Image src={ member.medicalCertificate.attachment } />} */}
      {member.medicalCertificate && member.medicalCertificate.attachment && (
        <embed src={member.medicalCertificate.attachment} />
      )}
    </>
  );
};

export default MemberMedicalCertificate;
