<template>
  <div class="fixed bottom-10 right-2 z-30">
    <div
      class="guide-start w-4 h-4 m-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
    >
      <SvgIcon
        name="send-fill"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
      />
    </div>
    <PopOver placement="left-center" class="flex items-center guide-feedback">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <SvgIcon
            name="message-fill"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          />
        </div>
      </template>
      <div>
        <SvgIcon name="message-fill" />
      </div>
    </PopOver>
  </div>
</template>
