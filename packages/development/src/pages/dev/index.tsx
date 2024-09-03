import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '0c1e755c-7fc2-457e-9a84-96a447c265d5': {
      id: '0c1e755c-7fc2-457e-9a84-96a447c265d5',
      value: [
        {
          id: 'd3b769aa-4cde-496f-80c9-87020f89e687',
          type: 'heading-one',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              text: 'Developing Table',
            },
          ],
        },
      ],
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
      },
    },
    '252e6cc7-56e8-4484-9d1e-c57201198e99': {
      id: '252e6cc7-56e8-4484-9d1e-c57201198e99',
      value: [
        {
          id: '63903621-1cd1-4491-9c4c-5bbafdd86a59',
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 1,
        depth: 0,
      },
    },
    '6516ae5e-46c5-4cf2-ac27-c135543ae745': {
      id: '6516ae5e-46c5-4cf2-ac27-c135543ae745',
      value: [
        {
          id: '347767ed-7c47-4a96-a59d-1fc292ff05e0',
          type: 'table',
          props: {
            headerRow: true,
            headerColumn: false,
            columns: [
              {
                index: 0,
                width: 150,
              },
              {
                index: 1,
                width: 180,
              },
              {
                index: 2,
                width: 220,
              },
              {
                index: 3,
                width: 300,
              },
              {
                index: 4,
                width: 200,
              },
              {
                index: 5,
                width: 200,
              },
              {
                index: 6,
                width: 200,
              },
              {
                index: 7,
                width: 200,
              },
              {
                index: 8,
                width: 200,
              },
              {
                index: 9,
                width: 200,
              },
              {
                index: 10,
                width: 200,
              },
              {
                index: 11,
                width: 200,
              },
            ],
          },
          children: [
            {
              id: '8ca2cfcb-22ae-4f5d-9b61-22051ad4e160',
              type: 'table-row',
              children: [
                {
                  id: 'a2cd8005-b434-45bd-b010-d9b8476d675f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'First row',
                    },
                  ],
                },
                {
                  id: 'e3ca917f-f1ec-4458-acac-d2106372ac9f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Second column',
                    },
                  ],
                },
                {
                  id: 'bf3111bf-c6c1-4639-9d89-a5edefcd7de6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0eb973a8-92e8-42da-94d6-2db321bb8af5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0b0344ef-3060-47da-b340-28b4b973f707',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '1b0f36b4-08d9-4f7d-aec1-9cf19f678353',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'fde7c8b5-5b08-4b77-8379-727bf8727b50',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '5af5490e-d769-4462-9d24-dcae1a567c00',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '32cc3241-ae67-4540-948e-d06aac295c3f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9dbe7a3b-0c63-4bf6-b8b2-60705467a155',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '89bc0989-3d35-4dae-9c9f-606e1a34207d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd9851134-5c6d-4434-919c-b0ca13807f3b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              id: '6b4a16d4-b1ad-4833-8a0e-5e5912ae6148',
              type: 'table-row',
              children: [
                {
                  id: 'a2cd8005-b434-45bd-b010-d9b8476d675f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Second row',
                    },
                  ],
                },
                {
                  id: 'e3ca917f-f1ec-4458-acac-d2106372ac9f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '43d688ce-03b7-49ab-850a-9742cb7c0ff2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '591f81eb-ed11-4f8c-87b2-3acf81df6118',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '81ed4cca-a4a7-4f1c-a6d7-7807013f7535',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'bda67cf5-35d3-47d8-95a5-b4880d66658d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f7c2e9a6-c98b-44d3-8de9-1784de325c12',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '6dfc3ce4-e308-4276-91c3-dd1ebfc73aa1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2385ff89-7ef0-4826-91ff-add26ec08fb7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '7f2d85bc-fb60-491a-b607-3afb18c62605',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f4f3c7a1-f572-4ab2-b820-f3573546632a',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e8febff6-dde7-45e7-a056-83bc92ae0f35',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              id: '332d7700-fa24-4c51-8027-faf18d2a8c4d',
              type: 'table-row',
              children: [
                {
                  id: '9490c499-3a12-4e10-b857-4fe8b9ca0eda',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'Third ',
                    },
                    {
                      bold: true,
                      text: 'row',
                    },
                  ],
                },
                {
                  id: '2c0e0066-8d7d-45ef-a5e8-ab3f50597e70',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '1f7bc81f-1c4e-4a3c-9ab2-f74c4b8c3b2e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b813c809-9e85-4af2-b244-8692f1f8b36f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '84b912d9-c3ba-4135-8cfd-997e28d8cfe8',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd547e40d-a9ef-48a4-90a8-13d7f754df57',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'asdas sdsad',
                    },
                  ],
                },
                {
                  id: 'bb09a463-3c79-4c7f-af2c-a6e6e52db355',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'fa78595d-4b93-4a40-8c81-5d499302e37b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '1800d5c1-c79a-42e9-b5f8-8ce93e043df0',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e7636d01-139d-480b-a0a3-ecb61c48fbc2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '22810d1c-f080-4f10-b556-67c01f7358f2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8f0be351-083f-4679-9604-5cae29d4e6a6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
            },
            {
              id: 'e027a48c-ec2f-43ef-9e75-99017c88489a',
              type: 'table-row',
              children: [
                {
                  id: '7807959f-54b1-45b8-9d1a-98c107a14f5f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '4f97c4f6-37fb-48c8-a35c-3d07472a7155',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f16f3621-a960-496d-ac86-e1e102ff61f1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '4bbfb8ae-d0b1-462e-b176-79fcee897d7a',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '94d62e35-9123-4859-976c-abc8082f31dd',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'a',
                    },
                  ],
                },
                {
                  id: 'f5563cc9-04f4-4165-9f2f-9044f0e180c1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f045d7ed-5dfc-43e9-8ce7-864b0016d75b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd16c2b45-597a-48fe-bf24-4bb0b253c5d7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '7b5898d8-d056-4be2-8412-1e69e2067041',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '6574cb63-105d-414e-8bc6-a9289696a6de',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c6ab232c-54cd-4492-ae07-a763dd34af52',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0e1da7b1-1244-412d-b2be-26ff4c7e81cc',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '7f89f05a-216a-4849-ae76-fe7b991985dc',
              type: 'table-row',
              children: [
                {
                  id: '16757e14-f718-4506-83e7-9ec373c35f26',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd75d8804-ae8a-44e5-b0a1-18eabe201d57',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b3c42be3-5451-4f78-b49d-0818f4de3144',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c566f5ba-9dc6-4b0f-9f6b-7b384317437c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'be866195-4f15-49ea-a56b-305891df4e74',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'de431646-8f90-463c-97ab-4997bbe0d856',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '02adee02-ebd1-4096-ad97-072fdc255f74',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'a863eeaf-49dd-4df8-ab11-729d4e92f652',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '80476e4c-dcfb-47bc-8bfe-a4de41cfd902',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f48c9e73-e0bd-4d3b-b3b3-f4d3781acf65',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '13646648-00b4-4db5-a817-fbefc63c2be7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2a536062-a64b-417a-b267-330236a100a7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '74f82a8f-1cf1-4ce8-9ad2-39d6625b9060',
              type: 'table-row',
              children: [
                {
                  id: '6b3c39d3-8304-4dbb-9040-47cfc40d1e2c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '17240f30-7d9f-412e-a881-55ff8508b577',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'aa2605d5-58b1-432c-a34d-a8422717e924',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '5d06dc48-745e-4a00-931d-7ffd8e1066ba',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd7b1ca26-d2b8-46fb-9a3d-97c41a3a1b5c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '5a03e9ab-ec76-4af9-b683-d7f5f05e1603',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd72edfe4-9c13-4f59-8049-2300279e06fd',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0c083cf6-c941-40f9-9b20-7f7d9043b8b3',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'af3130ed-f9ec-4ce7-ac0e-87a2612e39cb',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'a42c6fec-8d3e-4ad0-a6f0-ba9d5d00bb49',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'baad8c9e-0dc7-4f71-9510-09ef47953e3b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c3c2474e-ca65-482f-9f39-fe7513147105',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: 'f30c45f9-c309-4d27-bd0a-633afff2e0fa',
              type: 'table-row',
              children: [
                {
                  id: 'ace1f569-dd2c-45c3-9cb8-43fb478bea7d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9a7b97f3-9cf3-4295-85d2-03d3a6070702',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e47f24aa-5888-4bc9-8623-1f674a6c1b1c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ac5c439f-39b5-4e4a-8229-fa2ad9a40fc8',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'edcdde81-6c10-4cf1-b0a3-620513730a23',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2a0c8722-89ce-41fe-a63a-e3795a6b2193',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '95bfd682-a262-4788-964b-bf0bf57ce7b5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '74797996-11f9-4757-b078-c108dd70f9f5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c2885ea1-b9d4-4004-9b79-9ec7be6a789f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '5a9c80c4-0b87-4001-b819-8b0b14dcbd1f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '08e8d391-de3d-42c4-8d1d-dee950c5dc48',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b8dd9338-7cea-463d-bf84-c477f7a1f448',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: 'b34f4122-e158-4933-9393-6ef28d74232f',
              type: 'table-row',
              children: [
                {
                  id: 'e59ae4a9-4f46-45ef-8df9-0258e384e64c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '52bc8b9d-8390-4489-962d-046f0f173733',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '220b540f-cd17-4fe3-b714-819b0fece411',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'aed990e2-be53-4f9d-8b2d-965f3518ac93',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '991a656e-9028-4499-b26f-0c30f5ca451b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '426fa129-dc4a-439c-98c8-e6c71bd8404e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '95dbdc1e-5ade-4abc-a4f5-0716c60c8afc',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '1a1feffc-4fed-4c08-929c-d9559c505b33',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '041f6271-cd3e-4178-8873-e8d710739876',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '6337663b-5eef-4f56-a772-26f34d9cb1df',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'a49940d7-2061-4e4a-8480-e8c4e01d7e74',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2cbe2645-7942-4153-8512-64a3c0c2fd60',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '8a980118-ad4d-4268-861c-ecf99d681c93',
              type: 'table-row',
              children: [
                {
                  id: '03f1a5e9-a562-4de8-9de7-a6a298089e74',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '43ddc53d-36d7-4713-88dc-0def7f290432',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f332ca32-52f3-407f-9ba3-5b5485afabd3',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '486bb42b-7839-4136-adff-9d5f48236682',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8cfbba24-ca71-4ab7-91b9-f5326ff6af46',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'a5b262f0-37aa-4474-bacc-af8481af5fb0',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e45c1a57-0972-4311-9ff7-46c91e9e0198',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '03ccd3ef-5574-4eb8-b89b-658627cc7e65',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b8ae1515-b3b5-40ba-900e-91ca56fd96de',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'fa536e9b-8deb-46b8-af4d-459e3a8eb3e6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9f1d3bf1-664c-4b12-9ef8-910ef8a025f0',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '12227c9b-97ff-454c-810e-e386193e71d8',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: 'bd1a8e93-72ab-46ff-ae06-3f99f40f12a7',
              type: 'table-row',
              children: [
                {
                  id: 'a8737242-9b78-4e73-b6f6-5532d239bf57',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '880ac3ad-7b04-478d-b2bb-7aa5bfe830ad',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3486d0d4-ac5b-4523-a2a8-73e433cbffec',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd8d8ddec-ea99-4f8c-b433-d53c021cda3f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '376ebc74-5c62-496e-8d94-11a34bb24519',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'db39f996-5674-4b9f-9ab1-eec1922e0daa',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ab3d5e4d-4f94-4f1d-8a3d-c1b123485d07',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '90823f67-ba48-4ffc-973f-a2a23d84d4ad',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '05c49a2d-2121-404c-87fd-4c162b410236',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ac2100c5-782d-438a-89b7-9c4f38db8eb2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '7ca7d8b1-c91e-4aa2-8cef-898e9a4e7c26',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'edb53d25-48c7-4e85-bd46-571e8a73400c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '3cd906cc-2f09-4a3a-b5f4-ce274387d185',
              type: 'table-row',
              children: [
                {
                  id: '135bee10-e472-4d47-a9fc-40012a304b51',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9c8e1595-21cb-4157-bb63-be6c3354baad',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '93a5436e-4035-4643-8afe-706bbf052993',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '28e9163a-db67-4b32-b55d-0bee1ad8a603',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '65956ac7-40ae-4320-9148-063ca164ee1b',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '96e1d4c2-1440-409c-bfde-3d2f7dd6d9ac',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '6c67c6bf-0115-474b-9c10-752742ed7ef5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9d47fcf7-e37f-4ef9-96e3-626183232d8e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ab57801f-cce0-4da1-bd8f-997d2d38fa00',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '672ff47f-c9bd-43b2-bd6a-6c5757d23188',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ad02df95-668a-47b1-b5e3-6fd4f0f66b85',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c1484974-c244-4e98-93c1-9c5476fc89fd',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: 'd87e0cd7-5e57-432b-985d-d00e3fc0dda2',
              type: 'table-row',
              children: [
                {
                  id: '49d00fdb-13cd-4f85-919c-e8b7d4f5b369',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '88f8219e-9e57-49fd-ba6e-02c234a83f32',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b80f9552-72d7-4307-bbfb-720364b0ad09',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2a2bacac-54bb-41ad-ae07-73d86b344994',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '56449924-21d7-4076-bd6a-740313cd2590',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '804cdb58-2e70-46be-83a0-69ccfb29cd48',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e5f4663f-c3a0-42f8-a8eb-e4cd713fd776',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'dfc92963-605d-4fa6-86bf-a2b7a1c1f884',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2a1f6404-6e1b-4270-915c-6a78e0e65aa8',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '2d5ced87-655e-495f-a48b-002d6b412920',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3a6c558d-edb2-45aa-91ee-56cec861e9c5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'afe5be4f-84b5-430e-a0cc-5898583b1e95',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '10daca24-917e-47c3-972b-82ca6aaa5c7f',
              type: 'table-row',
              children: [
                {
                  id: '2ada74c8-472a-4328-b8c4-fee15ef4ccf7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '05a03086-3502-4299-bd5f-d38f6de0a47d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '260a9923-1cbb-4b65-965a-ddd3eb8632f0',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: 'asdas',
                    },
                  ],
                },
                {
                  id: '4f61cc75-e7e8-4cfb-9fcd-8b8c009a25dd',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '4f1db64e-0463-46e8-bdf1-1a654a838056',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '490039f1-1ee1-4b5f-b9fb-30b3b11a8016',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '828a4b1d-5788-448d-92c7-10192eb9ed18',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8bd76fa3-e5f9-4a46-bc3b-7d9500cac1f1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '35073adf-1fd9-48fc-a9b2-3748222f9054',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '57c6901b-8e34-49f0-9d34-32be80991497',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c3eaf8c6-bcb1-440b-8039-ea68bc733837',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'c101cc0b-6cf4-438f-a4c2-7da2c12257a4',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '79f58aea-7c2a-4c19-b120-97a05a0db84c',
              type: 'table-row',
              children: [
                {
                  id: '6a02a26c-f8b6-40d8-b31e-94960cb34db0',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f12532dd-f8c2-468c-99a9-f6ed4cd4f114',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0d4470a1-0506-483b-865b-426740a90ff5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8bc06ba5-1fcf-4bee-99e3-66220cc6aeda',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3bceb34e-f3e5-4bb0-bd8f-5ee8cdafe484',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '15944cc1-a7d4-496d-8b6b-1b593c56fe9a',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '643a1a13-5b1a-455b-94b9-2943bf7fb03e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '08e2cc38-416b-4320-869d-8e7bffdb9ce7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd9850624-02ce-4e6d-8d2d-faf6995b9443',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3f03c61a-48bf-4c6c-92ce-13cf1f67b756',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '786e87ea-8ad0-433a-8e57-e42eb69149b6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '202ef4d1-5fc7-4da2-aa79-e6dbbf58cd7c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '39c3ca64-fb44-4cbe-afd5-a54067697091',
              type: 'table-row',
              children: [
                {
                  id: 'c80e7fc6-e398-4fc4-b535-1e99f7807472',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '70fc1177-c3cb-4842-ae0f-ec42744b6b8f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9455ac68-56c6-4b3f-8cc4-97ec6452c7d3',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '55a7740b-fdf0-4926-9c5e-a84c74fbbaee',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '273344a5-9bc1-495e-b5c7-024f4ec8fc94',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '03dcebed-07e8-478a-8ac6-68e4353310d9',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e5f5e109-b778-4046-bb63-c88155a3dc42',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '5dae4389-ffa3-484d-87e3-c885ba87c0d2',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ad70f734-ad7e-49bc-a66e-629b908cef87',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '27ed0334-5715-4545-93fd-03e1c16a01dc',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e9c7b7b5-4545-446f-b91e-db31914abf89',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f80e8f5b-9a7c-42db-95c7-efb48e690566',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: '20dd5a9c-a247-4858-9753-60a3b3e85668',
              type: 'table-row',
              children: [
                {
                  id: 'fd50cbfe-8a4b-4714-8448-c1da4ad0235e',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'b6786799-4cc7-4dd4-96f3-5afb68576611',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd9ebbc21-b1cd-48b9-a2cb-0c1498313143',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'a427aa04-2219-4820-a866-e974e66562d7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '24f1b76b-f7b9-41e7-bc83-5a3769da6ca6',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '1e0fc6eb-ada4-4fe2-adf7-ec61e9532cb4',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3572215d-bef7-435b-8fb6-31062f1bcd46',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '561ee860-4301-4533-af01-5fc8d324369d',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ff3fc127-9aae-4479-8e8d-04e1d6312e5f',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd5d0e0dc-44dc-4899-a542-22e9e106fcda',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'bee7e012-0d62-4ed6-bb29-d6c392ac8693',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '9e699473-540d-4ad0-9275-49c8cd8ae6f5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
            {
              id: 'ebe146e2-a995-4bb8-b68b-e3fb0ce6a7c1',
              type: 'table-row',
              children: [
                {
                  id: '436e5b93-d4ee-4e23-a8cb-2410b704530a',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'f3d873e9-f2ba-4aa7-a5e7-0e909884e1de',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'ea6df874-b641-49ad-86ae-f171a50866cf',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e00a582b-d73f-4215-a608-b7822a57fed5',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '0da8fc2e-964e-4568-acc6-475c982d67f9',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '02d335f4-adc4-4e96-8f37-fedc080cf705',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8fb9bd22-95fd-4b27-9f2c-d35d1eaa0ac1',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '225090a8-7899-4fb9-99c1-352c8a51bd50',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'd8ca4941-cb5e-4d7c-8487-4e77ead44e0c',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '3b58a34f-7dfa-495c-923f-eb84211abed7',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: '8c620ae7-ee1f-4d50-b64a-431edf13bd13',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
                {
                  id: 'e37d9bf7-3e9b-4f86-a36a-bd6ed32d0996',
                  type: 'table-data-cell',
                  children: [
                    {
                      text: '',
                    },
                  ],
                },
              ],
              props: {
                nodeType: 'block',
              },
            },
          ],
        },
      ],
      type: 'Table',
      meta: {
        order: 2,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => {
      setValue(data);
    });
  }, []);

  console.log(value);

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        style={EDITOR_STYLE}
        value={value}
      />
    </div>
  );
};

export default BasicExample;
