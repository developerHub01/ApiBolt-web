<template>
  <main class="min-h-screen w-full text-foreground font-sans overflow-x-hidden">
    <header class="relative py-24 md:py-32 pt-50 md:pt-60 border-white/5">
      <PublicHomeHeroAnimatedBg />
      <div class="container px-4 mx-auto relative z-10">
        <div class="flex flex-col lg:flex-row justify-between gap-12">
          <div ref="heroText" class="opacity-0 translate-y-8 max-w-2xl">
            <h1
              class="text-4xl md:text-6xl font-bold font-brand tracking-tight text-white mb-6"
            >
              Fake API
            </h1>
            <p class="text-lg text-muted-foreground leading-relaxed">
              A comprehensive mock API for prototyping and testing.
              <span class="text-foreground"
                >Zero config. No auth. Always free.</span
              >
            </p>
            <NuxtLink
              :to="APP_INSTALLER_URL"
              download
              class="group inline-flex items-center justify-center gap-2 px-6 py-3 mt-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center justify-center gap-2">
                <Download class="w-4 h-4" />
                DOWNLOAD APIBOLT
              </span>
            </NuxtLink>
          </div>

          <div
            ref="heroCode"
            class="w-fit self-end lg:w-auto opacity-0 translate-y-8"
          >
            <div
              class="group relative rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/50"
            >
              <div class="flex items-center gap-4 px-5 py-4 font-mono text-sm">
                <span class="text-primary font-bold">GET</span>
                <span class="text-white select-all">{{ apiBaseUrl }}</span>
                <button
                  @click="copy(apiBaseUrl)"
                  class="ml-4 p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto max-w-7xl px-4 py-20 relative">
      <nav
        ref="navRef"
        class="flex flex-wrap gap-2 mb-16 pb-8 border-b border-white/5 opacity-0 translate-y-4"
      >
        <a
          v-for="target in targets"
          :key="target.id"
          :href="`#${target.id}`"
          @click.prevent="scrollToSection(target.id)"
          class="px-4 py-2 bg-secondary/30 border border-white/5 rounded text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-secondary/50 transition-all active:scale-95 cursor-pointer"
        >
          {{ target.label }}
        </a>
      </nav>

      <div class="space-y-24">
        <section id="users" class="content-section opacity-0 translate-y-8">
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">USERS</h2>
            <span class="font-mono text-xs text-muted-foreground">/users</span>
          </div>
          <div class="grid gap-3">
            <EndpointCard
              method="GET"
              path="/fake/v1/users"
              description="Get paginated list."
              :params="['page', 'limit']"
              :example="usersExample"
            />
            <EndpointCard
              method="GET"
              path="/fake/v1/users/{id}"
              description="Get user details."
              :params="['id']"
              :example="userExample"
            />
            <EndpointCard
              method="POST"
              path="/fake/v1/users"
              description="Create user."
            />
            <EndpointCard
              method="PUT"
              path="/fake/v1/users/{id}"
              description="Update user."
            />
            <EndpointCard
              method="PATCH"
              path="/fake/v1/users/{id}"
              description="Patch user."
            />
            <EndpointCard
              method="DELETE"
              path="/fake/v1/users/{id}"
              description="Remove user."
            />
          </div>
        </section>

        <section id="posts" class="content-section opacity-0 translate-y-8">
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">POSTS</h2>
            <span class="font-mono text-xs text-muted-foreground">/posts</span>
          </div>
          <div class="grid gap-3">
            <EndpointCard
              method="GET"
              path="/fake/v1/posts"
              description="Get feed."
              :params="['page', 'limit']"
              :example="postsExample"
            />
            <EndpointCard
              method="GET"
              path="/fake/v1/posts/{id}"
              description="Get single post."
              :params="['id']"
            />
            <EndpointCard
              method="POST"
              path="/fake/v1/posts"
              description="Publish post."
            />
            <EndpointCard
              method="PUT"
              path="/fake/v1/posts/{id}"
              description="Edit post."
            />
            <EndpointCard
              method="DELETE"
              path="/fake/v1/posts/{id}"
              description="Delete post."
            />
          </div>
        </section>

        <section id="products" class="content-section opacity-0 translate-y-8">
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">PRODUCTS</h2>
            <span class="font-mono text-xs text-muted-foreground"
              >/products</span
            >
          </div>
          <div class="grid gap-3">
            <EndpointCard
              method="GET"
              path="/fake/v1/products"
              description="Catalog list."
              :params="['page', 'category']"
            />
            <EndpointCard
              method="GET"
              path="/fake/v1/products/{id}"
              description="Product details."
              :params="['id']"
            />
            <EndpointCard
              method="PATCH"
              path="/fake/v1/products/{id}"
              description="Update stock."
            />
            <EndpointCard
              method="DELETE"
              path="/fake/v1/products/{id}"
              description="Remove product."
            />
          </div>
        </section>

        <section id="orders" class="content-section opacity-0 translate-y-8">
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">ORDERS</h2>
            <span class="font-mono text-xs text-muted-foreground">/orders</span>
          </div>
          <div class="grid gap-3">
            <EndpointCard
              method="GET"
              path="/fake/v1/orders"
              description="Order history."
              :params="['page']"
            />
            <EndpointCard
              method="GET"
              path="/fake/v1/orders/{id}"
              description="Order details."
              :params="['id']"
            />
            <EndpointCard
              method="PUT"
              path="/fake/v1/orders/{id}"
              description="Update status."
            />
          </div>
        </section>

        <section
          id="categories"
          class="content-section opacity-0 translate-y-8"
        >
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">
              CATEGORIES
            </h2>
            <span class="font-mono text-xs text-muted-foreground"
              >/categories</span
            >
          </div>
          <div class="grid gap-3">
            <EndpointCard
              method="GET"
              path="/fake/v1/categories"
              description="All categories."
            />
            <EndpointCard
              method="GET"
              path="/fake/v1/categories/{id}"
              description="Single category."
            />
            <EndpointCard
              method="DELETE"
              path="/fake/v1/categories/{id}"
              description="Delete category."
            />
          </div>
        </section>

        <section id="status" class="content-section opacity-0 translate-y-8">
          <div class="flex items-baseline gap-4 mb-8">
            <h2 class="text-4xl font-black font-brand text-white">STATUS</h2>
            <span class="font-mono text-xs text-muted-foreground">/status</span>
          </div>
          <div
            class="p-6 bg-secondary/10 border border-white/5 rounded-lg flex items-center justify-between"
          >
            <code class="text-sm font-mono text-foreground"
              >GET {{ apiBaseUrl }}/status</code
            >
            <div
              class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold uppercase tracking-wider"
            >
              Operational
            </div>
          </div>
        </section>
      </div>

      <!-- Decorative Background Elements -->
      <div
        class="absolute bottom-10 -right-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      ></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Copy, Download } from "lucide-vue-next";
import EndpointCard from "~/components/public/Fake/EndpointCard.vue";
import { APP_INSTALLER_URL } from "~/constant/index.constant";

const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl as string;
const apiBaseUrl = `${siteUrl}/fake/v1`;

const seoTitle = "Fake API | APIBolt";
const seoDescription = "Professional-grade fake REST API for testing.";

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: `${siteUrl}/og.png`,
  ogUrl: siteUrl,
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: `${siteUrl}/og.png`,
  twitterCard: "summary_large_image",
});

const scrollToSection = (id: string) => {
  const nuxtApp = useNuxtApp();
  const lenis = nuxtApp.$lenis;

  if (lenis)
    lenis.scrollTo(`#${id}`, {
      offset: -120,
    });
  else {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }
};

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error(e);
  }
};

const targets = [
  {
    id: "users",
    label: "Users",
  },
  {
    id: "posts",
    label: "Posts",
  },
  {
    id: "products",
    label: "Products",
  },
  {
    id: "orders",
    label: "Orders",
  },
  {
    id: "categories",
    label: "Categories",
  },
  {
    id: "status",
    label: "Status",
  },
];

const usersExample = JSON.stringify(
  {
    data: [
      {
        id: 1,
        username: "user",
        role: "admin",
      },
    ],
    meta: {
      total: 100,
    },
  },
  null,
  2,
);
const userExample = JSON.stringify(
  {
    id: 1,
    username: "user",
    email: "test@example.com",
  },
  null,
  2,
);
const postsExample = JSON.stringify(
  {
    data: [
      {
        id: 1,
        title: "Test Post",
        userId: 1,
      },
    ],
    meta: {
      total: 50,
    },
  },
  null,
  2,
);

const heroText = ref(null);
const heroCode = ref(null);
const navRef = ref(null);

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  if ($gsap && $ScrollTrigger) {
    const tl = $gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.to(heroText.value, {
      opacity: 1,
      y: 0,
      duration: 1,
    })
      .to(
        heroCode.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6",
      )
      .to(
        navRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6",
      );

    // Animate content sections on scroll
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section, index) => {
      $gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });
    });

    // Animate Sidebar
    $gsap.to(".sidebar-content", {
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.5,
    });
  }
});
</script>
