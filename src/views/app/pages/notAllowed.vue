<template>
  <b-row>
    <b-col>
      <div class="not-found-wrap text-center">
        <p class="text-36 subheading mb-3">{{$t('app.general.notAllowed.subtitle')}}</p>
        <p class="mb-5  text-muted text-18">
          {{$t('app.general.notAllowed.message')}}
        </p>
        <a class="btn btn-lg btn-primary btn-rounded" href="/">{{$t('app.general.notAllowed.home_button')}}</a
        >
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "401 Unauthorized"
  }
};
</script>

