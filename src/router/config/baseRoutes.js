import { ROUTES } from '@/constants/routes'

export const BASE_ROUTES = [
    {
        path: '/main',
        name: ROUTES.main.name,
        meta: {
            name: ROUTES.main.format_name, reference: ROUTES.main.name,
        },
        children: [{
            path: 'overview',
            name: ROUTES.overview.name,
            meta: {
                layout: 'empty', name: ROUTES.overview.format_name, reference: ROUTES.main.name,
            },
            component: () => import('@/views/Test/Test.vue'),
        }, {
            path: 'benefits',
            name: ROUTES.benefits.name,
            meta: {
                layout: 'empty', name: ROUTES.benefits.format_name, reference: ROUTES.main.name,
            },
            component: () => import('@/views/Test/Test.vue'),
        }],
    }, {
        path: '/dashboard',
        name: ROUTES.dashboard.name,
        meta: {
            name: ROUTES.dashboard.format_name, reference: ROUTES.dashboard.name,
        },
        children: [{
            path: 'analytics',
            name: ROUTES.analytics.name,
            meta: {
                layout: 'empty', name: ROUTES.analytics.format_name, reference: ROUTES.dashboard.name,
            },
            children: [
                {
                    path: 'campaign-comparison',
                    name: ROUTES.campaign_comparison.name,
                    meta: {
                        layout: 'empty', name: ROUTES.campaign_comparison.format_name, reference: ROUTES.dashboard.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                }, {
                    path: 'metrics-costs-conversions-roi',
                    name: ROUTES.metrics_costs_conversions_roi.name,
                    meta: {
                        layout: 'empty', name: ROUTES.metrics_costs_conversions_roi.format_name, reference: ROUTES.dashboard.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
            ],
        }, {
            path: '/ads-efficiency',
            name: ROUTES.ads_efficiency.name,
            meta: {
                name: ROUTES.ads_efficiency.format_name, reference: ROUTES.ads_efficiency.name,
            },
            children: [
                {
                    path: 'google',
                    name: ROUTES.ad_efficiency_google.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_google.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'facebook',
                    name: ROUTES.ad_efficiency_facebook.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_facebook.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'instagram',
                    name: ROUTES.ad_efficiency_instagram.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_instagram.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'linkedin',
                    name: ROUTES.ad_efficiency_linkedin.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_linkedin.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'twitter',
                    name: ROUTES.ad_efficiency_twitter.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_twitter.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'pinterest',
                    name: ROUTES.ad_efficiency_pinterest.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_pinterest.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
                {
                    path: 'yandex',
                    name: ROUTES.ad_efficiency_yandex.name,
                    meta: {
                        layout: 'empty', name: ROUTES.ad_efficiency_yandex.format_name, reference: ROUTES.ads_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                }],
        }, {
            path: '/email-marketing-efficiency',
            name: ROUTES.email_marketing_efficiency.name,
            meta: {
                layout: 'empty',
                name: ROUTES.email_marketing_efficiency.format_name,
                reference: ROUTES.email_marketing_efficiency.name,
            },
            children: [
                {
                    path: 'mailchimp-efficiency',
                    name: ROUTES.email_marketing_mailchimp_efficiency.name,
                    meta: {
                        layout: 'empty',
                        name: ROUTES.email_marketing_mailchimp_efficiency.format_name,
                        reference: ROUTES.email_marketing_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                }, {
                    path: 'sendinblue-efficiency',
                    name: ROUTES.email_marketing_sendinblue_efficiency.name,
                    meta: {
                        layout: 'empty',
                        name: ROUTES.email_marketing_sendinblue_efficiency.format_name,
                        reference: ROUTES.email_marketing_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
            ],
        }, {
            path: '/ab-testing',
            name: ROUTES.a_b_testing_efficiency.name,
            meta: {
                layout: 'empty',
                name: ROUTES.a_b_testing_efficiency.format_name,
                reference: ROUTES.a_b_testing_efficiency.name,
            },
            children: [
                {
                    path: 'test-results',
                    name: ROUTES.test_results_efficiency.name,
                    meta: {
                        layout: 'empty',
                        name: ROUTES.test_results_efficiency.format_name,
                        reference: ROUTES.a_b_testing_efficiency.name,
                    },
                    component: () => import('@/views/Test/Test.vue'),
                },
            ],
        }],
    }, {
        path: '/ad-campaigns',
        name: ROUTES.ad_campaigns.name,
        meta: {
            layout: 'empty',
            name: ROUTES.ad_campaigns.format_name,
            reference: ROUTES.ad_campaigns.name,
        },
        children: [
            {
                path: 'google',
                name: ROUTES.google_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.google_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Ad-Campaigns/GoogleAds/ManageGoogleAds.vue'),
            },
            {
                path: 'facebook',
                name: ROUTES.facebook_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.facebook_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'instagram',
                name: ROUTES.instagram_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.instagram_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'linkedin',
                name: ROUTES.linkedin_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.linkedin_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'twitter',
                name: ROUTES.twitter_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.twitter_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'pinterest',
                name: ROUTES.pinterest_ads.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.pinterest_ads.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'yandex-direct',
                name: ROUTES.yandex_direct.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.yandex_direct.format_name,
                    reference: ROUTES.ad_campaigns.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/email-marketing',
        name: ROUTES.email_marketing.name,
        meta: {
            layout: 'empty',
            name: ROUTES.email_marketing.format_name,
            reference: ROUTES.email_marketing.name,
        },
        children: [
            {
                path: 'mailchimp',
                name: ROUTES.mailchimp.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.mailchimp.format_name,
                    reference: ROUTES.email_marketing.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            }, {
                path: 'sendin-blue',
                name: ROUTES.sendin_blue.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.sendin_blue.format_name,
                    reference: ROUTES.email_marketing.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/optimization',
        name: ROUTES.optimization.name,
        meta: {
            layout: 'empty',
            name: ROUTES.optimization.format_name,
            reference: ROUTES.optimization.name,
        },
        children: [
            {
                path: 'ab-testing',
                name: ROUTES.optimization_a_b_testing.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.optimization_a_b_testing.format_name,
                    reference: ROUTES.optimization.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'analytics-reports',
                name: ROUTES.optimization_analytics_and_reports.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.optimization_analytics_and_reports.format_name,
                    reference: ROUTES.optimization.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/integrations',
        name: ROUTES.integrations.name,
        meta: {
            layout: 'empty',
            name: ROUTES.integrations.format_name,
            reference: ROUTES.integrations.name,
        },
        children: [
            {
                path: 'available',
                name: ROUTES.available_integrations.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.available_integrations.format_name,
                    reference: ROUTES.integrations.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'setup',
                name: ROUTES.setup_integrations.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.setup_integrations.format_name,
                    reference: ROUTES.integrations.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/documentation',
        name: ROUTES.documentation.name,
        meta: {
            layout: 'empty',
            name: ROUTES.documentation.format_name,
            reference: ROUTES.documentation.name,
        },
        children: [
            {
                path: 'guides',
                name: ROUTES.guides.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.guides.format_name,
                    reference: ROUTES.documentation.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'api',
                name: ROUTES.api_documentation.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.api_documentation.format_name,
                    reference: ROUTES.documentation.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'faq',
                name: ROUTES.faq.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.faq.format_name,
                    reference: ROUTES.documentation.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/blog',
        name: ROUTES.blog.name,
        meta: {
            layout: 'empty',
            name: ROUTES.blog.format_name,
            reference: ROUTES.blog.name,
        },
        children: [
            {
                path: 'marketing-articles',
                name: ROUTES.marketing_articles.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.marketing_articles.format_name,
                    reference: ROUTES.blog.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'use-cases',
                name: ROUTES.use_cases.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.use_cases.format_name,
                    reference: ROUTES.blog.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'news-and-updates',
                name: ROUTES.news_and_updates.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.news_and_updates.format_name,
                    reference: ROUTES.blog.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/support',
        name: ROUTES.support.name,
        meta: {
            layout: 'empty',
            name: ROUTES.support.format_name,
            reference: ROUTES.support.name,
        },
        children: [
            {
                path: 'contact',
                name: ROUTES.contact_info.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.contact_info.format_name,
                    reference: ROUTES.support.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'chat',
                name: ROUTES.support_chat.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.support_chat.format_name,
                    reference: ROUTES.support.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'tickets',
                name: ROUTES.ticket_system.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.ticket_system.format_name,
                    reference: ROUTES.support.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    }, {
        path: '/user-account',
        name: ROUTES.user_account.name,
        meta: {
            layout: 'empty',
            name: ROUTES.user_account.format_name,
            reference: ROUTES.user_account.name,
        },
        children: [
            {
                path: 'profile',
                name: ROUTES.user_profile.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.user_profile.format_name,
                    reference: ROUTES.user_account.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'settings',
                name: ROUTES.account_settings.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.account_settings.format_name,
                    reference: ROUTES.user_account.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
            {
                path: 'activity-history',
                name: ROUTES.activity_history.name,
                meta: {
                    layout: 'empty',
                    name: ROUTES.activity_history.format_name,
                    reference: ROUTES.user_account.name,
                },
                component: () => import('@/views/Test/Test.vue'),
            },
        ],
    },
]
