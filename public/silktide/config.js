silktideCookieBannerManager.updateCookieBannerConfig({
  background: { showBackground: true },
  cookieIcon: { position: "bottomRight" },
  cookieTypes: [
    {
      id: "niezb_dne_pliki_cookies",
      name: "Niezbędne pliki cookies",
      description:
        "<p>Pliki cookies niezbędne do działania usług dostępnych na stronie internetowej, umożliwiające przeglądanie ofert lub dokonywanie rezerwacji, wspierające mechanizmy bezpieczeństwa, m.in.: uwierzytelnianie użytkowników i wykrywanie nadużyć. Te pliki są wymagane do prawidłowego funkcjonowania strony internetowej. Nie wymagają Twojej zgody.</p>",
      required: true,
    },
    {
      id: "analityczne_pliki_cookies",
      name: "Analityczne pliki cookies",
      description:
        "<p>Pliki cookies umożliwiające zbieranie informacji o sposobie korzystania przez użytkownika ze strony internetowej w celu optymalizacji jej funkcjonowania oraz dostosowania do oczekiwań użytkownika. Wyrażając zgodę na te pliki cookies, zgadzasz się na przetwarzanie danych dotyczących Twojej aktywności na stronie w celach analitycznych.</p>",
      required: false,
    },
    {
      id: "marketingowe_pliki_cookies",
      name: "Marketingowe pliki cookies",
      description:
        "<p>Pliki cookie umożliwiające wyświetlanie użytkownikowi treści marketingowych dostosowanych do jego preferencji oraz kierowanie do niego powiadomień o ofertach marketingowych odpowiadających jego zainteresowaniom, obejmujących informacje dotyczące aktywności użytkownika, produktów i usług administratora strony i podmiotów trzecich. Zgoda na te pliki cookie oznacza, że Twoje dane mogą być używane do personalizacji reklam oraz analizy skuteczności naszych kampanii reklamowych.</p>",
      required: false,
    },
  ],
  text: {
    banner: {
      description:
        '<p>Używamy plików cookies, aby poprawić komfort korzystania ze strony, dostosować treści do Twoich potrzeb oraz analizować ruch. <a href="/cookie-policy" target="_blank">Polityka cookies</a>.</p>',
      acceptAllButtonText: "Zaakceptuj wszystkie",
      acceptAllButtonAccessibleLabel: "Zaakceptuj wszystkie",
      rejectNonEssentialButtonText: "Odrzuć niewymagane",
      rejectNonEssentialButtonAccessibleLabel: "Odrzuć niewymagane",
      preferencesButtonText: "Ustawienia",
      preferencesButtonAccessibleLabel: "Ustawienia",
    },
    preferences: {
      title: "Dostosuj ustawienia plików cookies",
      description:
        "<p>Szanujemy Twoje prawo do prywatności. Możesz zdecydować, na które rodzaje plików cookies wyrażasz zgodę. Twoje ustawienia będą obowiązywać w całym serwisie.</p>",
      creditLinkText: "",
      creditLinkAccessibleLabel: "",
    },
  },
});
