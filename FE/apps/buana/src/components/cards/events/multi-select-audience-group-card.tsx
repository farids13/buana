import React  from 'react';
import type {ReactElement} from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import MultiSelect from '@/components/ui/multi-select';
import { useGetAudienceDropdown } from '@/lib/api/audience/get-audience-dropdown';

export default function MultiSelectComponent() : ReactElement  {
  const dropdownAudiences = useGetAudienceDropdown();
  const audienceGroupOptions = dropdownAudiences?.data?.map((audience) => ({
    label: audience.audienceName ?? '',
    value: audience.id,
  }))|| [];

  return (
    <div>
      <MultiSelect
        float
        id="audienceGroupIds"
        label='Select Audience Group'
        options={audienceGroupOptions}
        placeholder="Select your groups"
        style={{ width: '15em' }}
      />
    </div>
  );
};

