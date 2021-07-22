<?= snippet('site/header') ?>

<main class="mt-30 mx-18 md:mx-42 md:mt-42 lg:mx-66 2xl:mx-120 3xl:mr-auto 3xl:ml-auto 3xl:max-w-bigScreen 3xl:pr-126 3xl:pl-126">
  <?php foreach ($site->children()->listed() as $section) : ?>
    <section class="<?= $section->intendedTemplate() ?>">
      <?php snippet('components/' . $section->intendedTemplate(), compact('section')) ?>
    </section>
  <?php endforeach ?>
</main>

<?= snippet('components/modal') ?>

<?= snippet('site/footer') ?>


<!--  TODO: 
      lazy load - done
      rounded - done 
      mockap для телефона - done
      nextframe на map - done
      imask - done
      кнопки в меню - done
      скачок в меню - done
      error page - done
      вставить поплавок - 
      карта - 
      ховер на ссылки и оранжевые кнопки - done

      Шрифты
      anti aliasync - done

      отрицателньый letter-spacing

      1920px: container в hero на текст меньше  - done
      hero тест как на макете на 375 //как вариант 12px container

      1440: map description 40% /done

      location on map?? pasha?

      //4 разных картинки на доставку

      анимация карточек наоборт немного

      mobile video app width 75% - done

      white-space nowrap na map - done 
      modal on mobile - done

      padding 40 on tablet delivery - done

      подписи фото - done

      1920 отсутпы контейнера, больше кнопки - done 

      app больше кнопка на 1920 - done 

      футер уехал текст везде - done
-->