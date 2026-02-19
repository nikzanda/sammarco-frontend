import React from 'react';
import { Button, GetProp, Upload, UploadProps } from 'antd';
import { FaUpload } from 'react-icons/fa';
import Icon, { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from 'antd/es/upload';
import { useTranslation } from 'react-i18next';
import { EmailAttachmentInput } from '../../gql/graphql';
import { resolveAttachmentsUpload } from '../../utils';

type InputFormValue = EmailAttachmentInput | EmailAttachmentInput[];

interface BaseProps {
  children?: React.ReactNode;
  value?: InputFormValue;
  onChange?: (newValue: InputFormValue) => void;
}

interface DraggerSpecificProps extends Omit<DraggerProps, 'onChange'> {
  dragger: true;
}

interface UploadSpecificProps extends Omit<UploadProps, 'onChange'> {
  dragger?: false;
}

type Props = BaseProps & (DraggerSpecificProps | UploadSpecificProps);

const AttachmentInput: React.FC<Props> = ({
  dragger,
  name = 'files',
  multiple = true,
  customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess!('ok');
    }, 0);
  },
  children = undefined,
  value = undefined,
  fileList: fileListProp,
  onChange = () => {},
  ...uploadOrDraggerProps
}) => {
  const { t } = useTranslation();

  const [fileList, setFileList] = React.useState<Props['fileList']>(fileListProp);

  const handleChange = React.useCallback<GetProp<UploadProps, 'onChange'>>(
    async (info) => {
      setFileList(info.fileList);
      const result = await resolveAttachmentsUpload(info.fileList);
      if (onChange) {
        onChange(multiple ? result : result[0]);
      }
    },
    [multiple, onChange]
  );

  React.useEffect(() => {
    if (!value) {
      setFileList(undefined);
    }
  }, [value]);

  if (dragger) {
    const { height = 200, ...draggerProps } = uploadOrDraggerProps as DraggerProps;

    return (
      <Upload.Dragger
        {...draggerProps}
        fileList={fileList}
        name={name}
        multiple={multiple}
        customRequest={customRequest}
        onChange={handleChange}
        height={height}
      >
        {children || (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('upload.clickOrDrag')}</p>
            <p className="ant-upload-hint">{t('upload.hint')}</p>
          </>
        )}
      </Upload.Dragger>
    );
  }

  return (
    <Upload
      {...uploadOrDraggerProps}
      fileList={fileList}
      name={name}
      multiple={multiple}
      customRequest={customRequest}
      onChange={handleChange}
    >
      {children || <Button type="text" shape="circle" size="small" icon={<Icon component={FaUpload} />} />}
    </Upload>
  );
};

export default AttachmentInput;
