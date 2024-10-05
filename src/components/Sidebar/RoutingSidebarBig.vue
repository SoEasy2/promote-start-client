<template>
    <div class="relative " v-for="route in routes" :key="route.id">

       <div
           class="group transition-all"
           :class="[getStyles(route)]"
           @click="addOpenSubMenu(route, route)"
       >
           <div
               class="flex py-2 gap-x-2 items-center"
               :class="marginStyle"
           >
               <Dot
                   :customClass="getStylesDot(route)"
               />

               <div class="font-semibold text-sm">
                   {{ t(route.name) }}
               </div>

               <div
                   v-if="route.subMenu"
               >
                   <ArrowChevronBottomIcon />
               </div>
           </div>
       </div>

        <RoutingSidebarBig
            v-if="route.subMenu && subMenuOpens.includes(route.id)"
            :routes="route.subMenu"
            :subMenuOpens="subMenuOpens"
            :key="margin"
            :margin="margin + 3"
            @addOpenSubMenu="addOpenSubMenu"
        />
    </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

import ArrowChevronBottomIcon from '@/components/icons/ArrowChevronBottomIcon.vue'
import Dot from "@/components/Dot/Dot.vue";
import {computed, ref, watch} from "vue";

const props = defineProps({
    routes: {
        type: Array,
        default: () => [],
    },
    subMenuOpens: {
        type: Array,
        default: () => [],
    },
    margin: {
        type: Number,
        default: 5,
    }
})

const emits = defineEmits(['addOpenSubMenu'])

const { t } = useI18n()

const marginStyle = computed(() => `ml-${props.margin + 3}`)

function addOpenSubMenu(route) {
    emits('addOpenSubMenu', route)
}

function getStyles({ id }) {
    if (props.subMenuOpens.includes(id)) {
        return 'bg-blue-50 text-blue-600'
    }

    return 'hover:bg-blue-50 hover:text-blue-600 text-blue-gray-600 bg-white'
}

function getStylesDot({ id }) {
    if (props.subMenuOpens.includes(id)) {
        return 'bg-blue-600'
    }

    return 'bg-blue-gray-600 group-hover:bg-blue-600'
}
</script>
