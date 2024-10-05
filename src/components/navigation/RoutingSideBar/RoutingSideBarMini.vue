<template>
    <teleport to="body">
        <div
            class="pl-2 z-100 relative"
            :style="popupPosition"
            @mouseenter="onMouseenter"
        >
            <div class="w-40.5 p-2 bg-popUp-purple60 dark:bg-popUp-blue770 rounded-1.25">
                <div>
                    <div
                        class="flex items-center cursor-pointer"
                        v-for="sub in route.subMenu"
                        :key="sub.name"
                    >
                        <router-link
                            :to="{ name: sub.routeName }"
                            class="w-full p-2 font-medium text-xs rounded-1.25 whitespace-nowrap"
                            :class="[ checkCurrentLink(sub) ? 'text-gray-600 dark:text-purple-140' : 'text-gray-370 dark:text-white hover:text-gray-600 hover:bg-menu-purple70 dark:hover:bg-popUp-blue600' ]"
                            @click.stop
                        >
                            {{ t(sub.name) }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const props = defineProps({
    route: {
        type: Object,
        default: () => ({}),
    },
    popupPosition: {
        type: Object,
        default: () => ({}),
    },
    checkCurrentLink: {
        type: Function,
        default: () => (() => {}),
    },
})

const emits = defineEmits(['onMouseenter', 'onMouseleave', 'onMouseClick'])

const { t } = useI18n()

function onMouseenter() {
    emits('onMouseenter', props.route.id)
}

function onMouseleave() {
    emits('onMouseleave')
}

</script>
