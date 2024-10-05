import ArrowTopIcon from '@/components/icons/arrow/ArrowTopIcon.vue'
import ArrowBottomIcon from '@/components/icons/arrow/ArrowBottomIcon.vue'
import FilterIcon from '@/components/icons/filterTable/FilterIcon.vue'
import { VIEWS_TABLE_MOBILE_DIALOG } from '@/constants/viewsTableMobileDialog'

const ASC = 'asc'
const DESC = 'desc'

const SORT_RULES = [
    {
        key: ASC,
        label: 'Ascending',
        type: 'sort',
        icon: () => ArrowTopIcon,
        iconClass: 'max-mob:w-6 max-mob:h-6',
        view: VIEWS_TABLE_MOBILE_DIALOG.sorting,
    },
    {
        key: DESC,
        label: 'Descending',
        type: 'sort',
        icon: () => ArrowBottomIcon,
        iconClass: 'max-mob:w-6 max-mob:h-6',
        view: VIEWS_TABLE_MOBILE_DIALOG.sorting,
    },
]

const SORT_RULES_TABLE = [
    {
        key: 'filter',
        label: 'Add Filter',
        type: 'filter',
        icon: () => FilterIcon,
        iconClass: 'w-3.5 h-3.5 max-mob:w-6 max-mob:h-6',
        view: VIEWS_TABLE_MOBILE_DIALOG.filterStepContent,
    },
    ...SORT_RULES,
]

export {
    ASC,
    DESC,
    SORT_RULES,
    SORT_RULES_TABLE,
}
