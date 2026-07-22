import { defineAppConfig } from '#imports'

export default defineAppConfig({
    ui: {
        button: {
            slots: {
                base: 'font-medium',
            },

            variants: {
                size: {
                    xl: {
                        base: 'px-8 py-4 text-lg',
                    },
                },
            },
        },

        card: {
            slots: {
                root: 'rounded-[24px] shadow-sm',
            },
        },

        container: {
            base: 'max-w-7xl',
        },
    },
})
