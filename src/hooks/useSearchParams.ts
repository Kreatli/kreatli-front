/* eslint-disable @typescript-eslint/indent */
import { useSearchParams as useNextSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

export const useSearchParams = <T extends object>() => {
  const searchParams = useNextSearchParams();
  const router = useRouter();

  const setSearchParam = (key: string, value: string, replace = false) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams?.entries() ?? []));

    currentSearchParams.set(key, value.toString());

    const search = currentSearchParams.toString();

    if (replace) {
      router.replace({ search: `?${search}` });

      return;
    }

    router.push({ search: `?${search}` });
  };

  const setSearchParams = <K extends string>(
    params: Partial<Record<K, string | number | string[]>>,
    replace = false,
  ) => {
    const nonEmptyEntries = Object.entries(params)
      .filter(([, value]) => value && value.toString().length > 0)
      .map(([key, value]) => (value ? [key, value.toString()] : []));

    const search = new URLSearchParams([...nonEmptyEntries]).toString();

    if (replace) {
      router.replace({ search: search ? `?${search}` : '' });

      return;
    }

    router.push({ search: search ? `?${search}` : '' });
  };

  const searchParamsAsObject = React.useMemo(() => {
    return Array.from(searchParams?.entries() ?? []).reduce<T>(
      (acc, [key, value]) => ({
        ...acc,
        ...(value && value.toString().length > 0
          ? {
              [key]: value.includes(',') ? value.split(',') : value,
            }
          : {}),
      }),
      {} as T,
    );
  }, [searchParams]);

  return {
    searchParams,
    searchParamsAsObject,
    setSearchParam,
    setSearchParams,
  };
};
