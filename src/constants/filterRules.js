import { FILTERS_TABLE } from '@/constants/filtersTable'

const FILTER_STRING_RULES = [
    {
        key: 'contains', label: 'Contains', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'does_not_contains', label: 'Does not contain', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'starts_with', label: 'Starts with', prefix: 'Starts with ', onlyPrefix: false,
    },
    {
        key: 'ends_with', label: 'Ends with', prefix: 'Ends with ', onlyPrefix: false,
    },
]

const FILTER_STRING_RULES_WITH_EMPTY = [
    {
        key: 'contains', label: 'Contains', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'does_not_contains', label: 'Does not contain', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'starts_with', label: 'Starts with', prefix: 'Starts with ', onlyPrefix: false,
    },
    {
        key: 'ends_with', label: 'Ends with', prefix: 'Ends with ', onlyPrefix: false,
    },
    {
        key: 'is_empty', label: 'Is empty', prefix: 'Is empty', onlyPrefix: true,
    },
    {
        key: 'is_not_empty', label: 'Is not empty', prefix: 'Is not empty', onlyPrefix: true,
    },
]

const FILTER_NUMBER_RULES = [
    {
        key: 'equal', label: '=', prefix: '= ', onlyPrefix: false,
    },
    {
        key: 'not_equal', label: '≠', prefix: '≠ ', onlyPrefix: false,
    },
    {
        key: 'greater_than', label: '>', prefix: '> ', onlyPrefix: false,
    },
    {
        key: 'less_than', label: '<', prefix: '< ', onlyPrefix: false,
    },
    {
        key: 'greater_than_or_equal', label: '≥', prefix: '≥ ', onlyPrefix: false,
    },
    {
        key: 'less_than_or_equal', label: '≤', prefix: '≤ ', onlyPrefix: false,
    },
]

const FILTER_NUMBER_RULES_WITH_EMPTY = [
    {
        key: 'equal', label: '=', prefix: '= ', onlyPrefix: false,
    },
    {
        key: 'not_equal', label: '≠', prefix: '≠ ', onlyPrefix: false,
    },
    {
        key: 'greater_than', label: '>', prefix: '> ', onlyPrefix: false,
    },
    {
        key: 'less_than', label: '<', prefix: '< ', onlyPrefix: false,
    },
    {
        key: 'greater_than_or_equal', label: '≥', prefix: '≥ ', onlyPrefix: false,
    },
    {
        key: 'less_than_or_equal', label: '≤', prefix: '≤ ', onlyPrefix: false,
    },
    {
        key: 'is_empty', label: 'Is empty', prefix: 'Is empty', onlyPrefix: true,
    },
    {
        key: 'is_not_empty', label: 'Is not empty', prefix: 'Is not empty', onlyPrefix: true,
    },
]

const FILTER_LIST_RULES = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_LIST_RULES_WITH_EMPTY = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'is_empty', label: 'Is empty', prefix: 'Is empty ', onlyPrefix: true,
    },
    {
        key: 'is_not_empty', label: 'Is not empty', prefix: 'Is not empty ', onlyPrefix: true,
    },
]

const FILTER_BOOLEAN_RULES = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_DATE_RULES = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_SELECT_RULES = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_SELECT_RULES_WITH_EMPTY = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
    {
        key: 'is_empty', label: 'Is empty', prefix: 'Is empty ', onlyPrefix: true,
    },
    {
        key: 'is_not_empty', label: 'Is not empty', prefix: 'Is not empty ', onlyPrefix: true,
    },
]

const FILTER_TAGS_RULES = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_ACCOUNT_TAGS = [
    {
        key: 'is', label: 'Is', prefix: '', onlyPrefix: false,
    },
    {
        key: 'is_not', label: 'Is not', prefix: 'Not ', onlyPrefix: false,
    },
]

const FILTER_RULES = {
    [FILTERS_TABLE.string]: FILTER_STRING_RULES,
    [FILTERS_TABLE.string_with_empty]: FILTER_STRING_RULES_WITH_EMPTY,
    [FILTERS_TABLE.number]: FILTER_NUMBER_RULES,
    [FILTERS_TABLE.number_with_empty]: FILTER_NUMBER_RULES_WITH_EMPTY,
    [FILTERS_TABLE.list]: FILTER_LIST_RULES,
    [FILTERS_TABLE.list_with_empty]: FILTER_LIST_RULES_WITH_EMPTY,
    [FILTERS_TABLE.boolean]: FILTER_BOOLEAN_RULES,
    [FILTERS_TABLE.date]: FILTER_DATE_RULES,
    [FILTERS_TABLE.select]: FILTER_SELECT_RULES,
    [FILTERS_TABLE.select_with_empty]: FILTER_SELECT_RULES_WITH_EMPTY,
    [FILTERS_TABLE.tags]: [],
    [FILTERS_TABLE.caller_profile]: [],
    [FILTERS_TABLE.account_tags]: FILTER_ACCOUNT_TAGS,
    [FILTERS_TABLE.parameters]: [],
    [FILTERS_TABLE.tags]: FILTER_TAGS_RULES,
}

export {
    FILTER_RULES,
    FILTER_STRING_RULES,
    FILTER_STRING_RULES_WITH_EMPTY,
    FILTER_NUMBER_RULES,
    FILTER_NUMBER_RULES_WITH_EMPTY,
    FILTER_LIST_RULES,
    FILTER_BOOLEAN_RULES,
    FILTER_DATE_RULES,
    FILTER_SELECT_RULES,
    FILTER_LIST_RULES_WITH_EMPTY,
    FILTER_SELECT_RULES_WITH_EMPTY,
    FILTER_TAGS_RULES,
    FILTER_ACCOUNT_TAGS,
}
