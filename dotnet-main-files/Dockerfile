FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim-amd64 AS build-env

WORKDIR /app

ARG TARGETARCH
ARG TARGETOS
ARG VERSION

RUN if [ "$TARGETARCH" = "amd64" ] ; then DOTNET_TARGET=$TARGETOS-x64 ; else DOTNET_TARGET=$TARGETOS-$TARGETARCH ; fi \
    && echo $DOTNET_TARGET > /tmp/rid

# Copy csproj and restore as distinct layers
COPY ./ ./
ENV VERSION $VERSION
RUN dotnet restore -r $(cat /tmp/rid)
RUN dotnet publish -c Release -o out -r $(cat /tmp/rid) --version-suffix $VERSION --self-contained false --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
ARG NR_APP_NAME

# install the newrelic agent
RUN apt-get update && apt-get install -y wget ca-certificates gnupg \
&& echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | tee /etc/apt/sources.list.d/newrelic.list \
&& wget https://download.newrelic.com/*****.gpg \
&& apt-key add ******.gpg \
&& apt-get update \
&& apt-get install -y newrelic-dotnet-agent \
&& rm -rf /var/lib/apt/lists/*

# Enable the agent
ENV CORECLR_ENABLE_PROFILING=1 \
CORECLR_PROFILER={*******************} \
CORECLR_NEWRELIC_HOME=/usr/local/newrelic-netcore20-agent \
CORECLR_PROFILER_PATH=/usr/local/newrelic-netcore20-agent/libNewRelicProfiler.so \
NEW_RELIC_LICENSE_KEY=********************* \
NEW_RELIC_APP_NAME=$NR_APP_NAME

WORKDIR /app
RUN mkdir -p /app/out

RUN apt-get update; apt-get install -y fontconfig
RUN fc-cache -f -v

COPY --from=build-env /app/out .

ENV ASPNETCORE_URLS=http://[::]:657

EXPOSE 657

ENTRYPOINT ["dotnet", "*********.****************.dll"]