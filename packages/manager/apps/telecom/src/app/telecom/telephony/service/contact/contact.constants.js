export const DIRECTORY_INFO = {
  status: {
    todo: 'todo',
    doing: 'doing',
    error: 'error',
  },
  type: {
    delete: 'deletion',
    create: 'creation',
  },
};

export const WAY_NUMBER_EXTRA = [
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'S',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const DIRECTORY_WAY_NUMBER_EXTRA_ENUM = {
  BE: ['&nbsp;', 'A', 'B', 'C', ...WAY_NUMBER_EXTRA],
  OTHER: [
    '&nbsp;',
    'bis',
    'ter',
    'quater',
    'quinquies',
    'sexto',
    'septimo',
    'octimo',
    'nono',
    'A',
    ...WAY_NUMBER_EXTRA,
  ],
};

export const LEGAL_FORM_ENUM = {
  FR: ['individual', 'professional', 'corporation'],
  BE: ['individual', 'corporation'],
};

const CORPORATION_FR = {
  legalForm: true,
  name: false,
  legalConcept: true,
  occupation: false,
  siret: true,
  tva: false,
  ape: true,
  socialNominationExtra: true,
  email: true,
  cedex: true,
  universalDirectoryAvailable: true,
  pjdenomination: true,
  directoryServiceCode: true,
  displayMarketingDirectory: true,
  contactDisplayFirstName: false,
  displayOnlyCity: false,
  contactServiceDescription: true,
};

export const AVAILABLE_FIELDS = {
  FR: {
    individual: {
      legalForm: true,
      name: true,
      legalConcept: false,
      email: true,
      cedex: true,
      universalDirectoryAvailable: true,
      pjdenomination: false,
      directoryServiceCode: false,
      displayMarketingDirectory: true,
      contactDisplayFirstName: true,
      displayOnlyCity: true,
      contactServiceDescription: true,
    },
    professional: {
      legalForm: true,
      name: false,
      legalConcept: true,
      occupation: true,
      siret: true,
      tva: false,
      ape: true,
      socialNominationExtra: true,
      email: true,
      cedex: true,
      universalDirectoryAvailable: true,
      pjdenomination: true,
      directoryServiceCode: true,
      displayMarketingDirectory: true,
      contactDisplayFirstName: false,
      displayOnlyCity: false,
      contactServiceDescription: true,
    },
    corporation: {
      ...CORPORATION_FR,
    },
    association: {
      ...CORPORATION_FR,
    },
    other: {
      ...CORPORATION_FR,
    },
  },
  BE: {
    individual: {
      legalForm: true,
      name: true,
      legalConcept: false,
      email: false,
      cedex: false,
      universalDirectoryAvailable: true,
      pjdenomination: false,
      directoryServiceCode: false,
      displayMarketingDirectory: false,
      contactDisplayFirstName: false,
      displayOnlyCity: false,
      contactServiceDescription: false,
    },
    corporation: {
      legalForm: true,
      name: false,
      legalConcept: true,
      occupation: false,
      siret: false,
      tva: true,
      ape: false,
      socialNominationExtra: false,
      email: false,
      cedex: false,
      universalDirectoryAvailable: true,
      pjdenomination: false,
      directoryServiceCode: false,
      displayMarketingDirectory: false,
      contactDisplayFirstName: false,
      displayOnlyCity: false,
      contactServiceDescription: false,
    },
  },
  OTHER: {
    legalForm: false,
    name: true,
    legalConcept: false,
    email: true,
    cedex: true,
    universalDirectoryAvailable: false,
  },
};

export const REGEX = {
  siret: /^\d{14}$/,
  tva: /^(?:be)?\d{10}$/i,
  ape: /^\d{4}\w$/,
  wayName: /[\w|\W|\s]+/,
  addressExtra: /^[A-Za-z0-9 ]*$/,
};

export default {
  DIRECTORY_INFO,
  DIRECTORY_WAY_NUMBER_EXTRA_ENUM,
  LEGAL_FORM_ENUM,
  AVAILABLE_FIELDS,
  REGEX,
};
