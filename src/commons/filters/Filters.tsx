import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilterValue } from 'antd/es/table/interface';
import { Badge, Button, Col, Collapse, GetProp, GetRef, Input, InputNumber, Row, Select, theme } from 'antd';
import Icon from '@ant-design/icons';
import { FaSearch, FaBan, FaChevronUp, FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';
import { endOfDay, formatISO, startOfDay } from 'date-fns';
import { IFilter } from './types';
import { DatePicker } from '../../components';
import { CoursePicker, ShiftPicker } from '../../core/courses/components';
import { MemberPicker } from '../../core/members/components';
import { FeePicker } from '../../core/fees/components';

type FilterInfo = Record<string, FilterValue | null>;

interface Props {
  topFilters: IFilter[];
  collapsableFilters: IFilter[];
  initialFilterInfo?: FilterInfo;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (values: FilterInfo) => void;
}

const Filters: React.FC<Props> = ({
  topFilters,
  collapsableFilters,
  initialFilterInfo = {},
  searchText,
  setSearchText,
  onSearch,
}) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const searchButtonRef = React.useRef<GetRef<typeof Button>>(null);

  const [filterInfo, setFilterInfo] = React.useState<FilterInfo>(initialFilterInfo || {});
  const [isOpen, setIsOpen] = React.useState(false);

  const showBadge = React.useMemo(() => {
    const result =
      Object.keys(filterInfo).filter((key) => !!collapsableFilters.find((el) => el.key === key) && !!filterInfo[key])
        .length > 0;
    return result;
  }, [collapsableFilters, filterInfo]);

  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = () => {
    searchButtonRef.current?.click();
  };

  const handleClear = React.useCallback(
    (filterKey: string) => {
      const newFilterInfo = { ...filterInfo, [filterKey]: null };
      setFilterInfo(newFilterInfo);
      onSearch(newFilterInfo);
    },
    [filterInfo, onSearch, setFilterInfo]
  );

  const renderFilter = React.useCallback(
    (filter: IFilter) => {
      const onChange: (newValue: FilterValue | null) => void = (value) => {
        if (Array.isArray(value)) {
          setFilterInfo({ ...filterInfo, [filter.key]: value.length > 0 ? value : null });
        } else {
          setFilterInfo({ ...filterInfo, [filter.key]: value });
        }
      };
      let style: React.CSSProperties = { width: '100%' };
      let placeholder: string | [string, string] = t(`commons.filter.${filter.key}`);
      const value = filterInfo[filter.key];

      switch (filter.type) {
        case 'text':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder;
          }
          return (
            <Input
              {...filter.props}
              value={value as GetProp<typeof Input, 'value'>}
              placeholder={placeholder}
              onChange={(event) => onChange(typeof event.target.value === 'string' ? [event.target.value] : null)}
              onPressEnter={handlePressEnter}
              onClear={() => handleClear(filter.key)}
              allowClear
            />
          );

        case 'numeric':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder;
          }
          return (
            <InputNumber<number>
              {...filter.props}
              value={value as number | null | undefined}
              onChange={(value) => onChange(typeof value === 'number' ? [value] : null)}
              onPressEnter={handlePressEnter}
              style={{ width: '100%' }}
            />
          );

        case 'select':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder as string;
          }
          if (filter.props && filter.props.style) {
            style = filter.props.style;
          }
          return (
            <Select
              {...filter.props}
              value={value}
              placeholder={placeholder}
              onChange={(value) => onChange(value?.length ? [value] : null)}
              onClear={() => handleClear(filter.key)}
              style={style}
              allowClear
            />
          );

        case 'switch':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder;
          }
          return (
            <Select
              value={value}
              allowClear
              placeholder={placeholder}
              options={[
                {
                  label: <Icon component={FaCheck} style={{ color: token.colorSuccess }} />,
                  value: true,
                },
                {
                  label: <Icon component={FaTimes} style={{ color: token.colorError }} />,
                  value: false,
                },
              ]}
              onChange={(value) => onChange!(typeof value === 'boolean' ? [value] : null)}
              onClear={() => handleClear(filter.key)}
              style={{ width: '100%' }}
            />
          );

        case 'date': {
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder;
          }
          if (filter.props && filter.props.style) {
            style = filter.props.style;
          }
          let allowEmpty: GetProp<typeof DatePicker.RangePicker, 'allowEmpty'> = [true, true];
          if (filter.props && filter.props.allowEmpty) {
            allowEmpty = filter.props.allowEmpty;
          }
          let format: GetProp<typeof DatePicker.RangePicker, 'format'> = 'dd/MM/yyyy';
          if (filter.props && filter.props.format) {
            format = filter.props.format;
          }
          return (
            <DatePicker.RangePicker
              {...filter.props}
              value={value as GetProp<typeof DatePicker.RangePicker, 'value'> | null}
              allowEmpty={allowEmpty}
              format={format}
              size="large"
              onChange={(values) => {
                let start: Date | undefined;
                let end: Date | undefined;

                if (values?.[0]) {
                  start = startOfDay(values[0]);
                  end = endOfDay(values[0]);
                }

                if (values?.[1]) {
                  end = endOfDay(values[1]);
                }

                onChange(start && end ? [formatISO(start), formatISO(end)] : null);
              }}
            />
          );
        }

        case 'month':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder;
          }
          if (filter.props && filter.props.style) {
            style = filter.props.style;
          }
          return (
            <DatePicker.MonthPicker
              {...filter.props}
              value={value as any}
              size="large"
              format="MMMM yyyy"
              placeholder={placeholder}
              style={style}
              onChange={(v) => onChange(v ? [v.getTime()] : null)}
            />
          );

        case 'courses':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder as string;
          }
          return (
            <CoursePicker
              {...filter.props}
              value={value as string[] | undefined}
              placeholder={placeholder}
              onChange={(value) => onChange(value?.length ? value : null)}
              onClear={() => handleClear(filter.key)}
            />
          );

        case 'members':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder as string;
          }
          return (
            <MemberPicker
              {...filter.props}
              value={value as string[] | undefined}
              placeholder={placeholder}
              onChange={(value) => onChange(value?.length ? value : null)}
              onClear={() => handleClear(filter.key)}
            />
          );

        case 'shift':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder as string;
          }
          return (
            <ShiftPicker
              {...filter.props}
              value={value as string[] | undefined}
              placeholder={placeholder}
              onChange={(value) => onChange(value?.length ? value : null)}
              onClear={() => handleClear(filter.key)}
            />
          );

        case 'fees':
          if (filter.props && filter.props.placeholder) {
            placeholder = filter.props.placeholder as string;
          }
          return (
            <FeePicker
              {...filter.props}
              value={value as string[] | undefined}
              placeholder={placeholder}
              onChange={(value) => onChange(value?.length ? value : null)}
              onClear={() => handleClear(filter.key)}
            />
          );

        default:
          throw new Error('filter not implemented');
      }
    },
    [filterInfo, handleClear, setFilterInfo, t, token.colorError, token.colorSuccess]
  );

  return (
    // <Affix offsetTop={25}>
    <Collapse
      collapsible="disabled"
      expandIcon={() => null}
      bordered={false}
      activeKey={isOpen ? ['1'] : undefined}
      style={{ background: token.colorBgContainer }}
      items={[
        {
          key: '1',
          style: {
            background: token.colorFillAlter,
            borderRadius: token.borderRadius,
          },
          label: (
            <Row gutter={[6, 6]} style={{ width: '100%' }}>
              <Col xs={24} md={20}>
                <Row gutter={[12, 12]}>
                  <Col key="search" xs={24} md={12} lg={8} xxl={6}>
                    <Input
                      size="large"
                      allowClear
                      value={searchText}
                      placeholder={t('commons.searchPlaceholder')}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                        setFilterInfo({ ...filterInfo, search: [e.target.value] });
                      }}
                      onPressEnter={handlePressEnter}
                      onClear={() => handleClear('search')}
                    />
                  </Col>
                  {topFilters.map((filter) => (
                    <Col key={filter.key} xs={24} md={12} lg={8} xxl={6}>
                      {renderFilter(filter)}
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs={24} md={4}>
                <Row gutter={[6, 6]} justify="end">
                  <Col>
                    <Button
                      size="large"
                      ref={searchButtonRef}
                      type="primary"
                      icon={<Icon component={FaSearch} />}
                      onClick={() => onSearch(filterInfo)}
                    />
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      danger
                      icon={<Icon component={FaBan} />}
                      onClick={() => {
                        setSearchText('');
                        setFilterInfo({});
                        onSearch({});
                      }}
                    />
                  </Col>
                  <Col hidden={collapsableFilters.length === 0}>
                    <Button
                      size="large"
                      icon={
                        isOpen ? (
                          <Icon component={FaChevronUp} />
                        ) : (
                          <Badge dot count={showBadge ? 1 : 0}>
                            <Icon component={FaChevronDown} />
                          </Badge>
                        )
                      }
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          ),
          children: (
            <Row gutter={[12, 12]}>
              {collapsableFilters.map((filter) => (
                <Col key={filter.key} xs={24} md={12} lg={8} xxl={6}>
                  {renderFilter(filter)}
                </Col>
              ))}
            </Row>
          ),
        },
      ]}
    />
    // </Affix>
  );
};

export default Filters;
