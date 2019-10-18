<template>
    <div>
        <span :key="actionIndex" v-for="(action, actionIndex) in actions">
                            <button :class="action.class"
                                    :title="action.title || ''"
                                    @click="handleCallback(action.callback, filterObject(data, action.args))"
                                    v-bind="$attrs"
                                    v-if="(typeof action.showKey === 'undefined' || action.showKey.length === 0 || action.showWhen.indexOf(data[action.showKey]) !== -1)
                                           && !action.hasOwnProperty('dropdown')">
                                {{ action.text }}
                            </button>
                            <div class="btn-group"
                                 v-else-if="(typeof action.showKey === 'undefined' || action.showKey.length === 0 || action.showWhen.indexOf(data[action.showKey]) !== -1)
                                               && action.hasOwnProperty('dropdown')">
                                <button
                                        :aria-expanded="true"
                                        :class="action.class"
                                        :title="action.title || ''"
                                        class="dropdown-toggle"
                                        data-toggle="dropdown">
                                    {{ action.title }}
                                </button>
                                <div class="dropdown-menu">
                                    <span :key="dropDownIndex" v-for="(dropDown, dropDownIndex) in action.dropdown">
                                    <a :title="dropDown.title || ''"
                                       @click="handleCallback(dropDown.callback, filterObject(data, dropDown.args))"
                                       class="dropdown-item"
                                       v-if="typeof dropDown.showKey === 'undefined' || dropDown.showKey.length === 0 || dropDown.showWhen.indexOf(data[dropDown.showKey]) !== -1">
                                        {{dropDown.text}}
                                    </a>
                                    </span>
                                </div>
                            </div>
                        </span>
    </div>
</template>

<script>
    export default {
        name: "TableActions",
        props: {
            actions: {
                type: Array,
                default: () => {
                    return [];
                },
            },
            data: {
                type: Object
            }
        },
        methods: {
            handleCallback(callback, argument) {
                if (!callback) return;
                this.$emit(callback, ...argument);
            },
            filterObject(haystack, needle = []) {
                // console.log(haystack);
                let data = [];
                if (needle.length === 0 || haystack.length === 0) return [];
                needle.forEach((key) => {
                    if (haystack.hasOwnProperty(key))
                        data.push(haystack[key]);
                });
                return data;
            }
        }
    }
</script>

<style scoped>

</style>
