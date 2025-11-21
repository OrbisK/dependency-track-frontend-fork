<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="TODO" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      charts
      <!--      <HomeStats :period="period" :range="range" /> -->
      <!--      <HomeChart :period="period" :range="range" /> -->
      <!--      <HomeSales :period="period" :range="range" /> -->
    </template>
  </UDashboardPanel>
</template>
