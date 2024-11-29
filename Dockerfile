FROM node:18.20.4

WORKDIR /app

ENV HTTP_PROXY=http://wwwproxy.osakac.ac.jp:8080
ENV HTTPS_PROXY=http://wwwproxy.osakac.ac.jp:8080

# apt-get用にプロキシ設定を追加（HTTPとHTTPS）
RUN echo 'Acquire::http::Proxy "http://wwwproxy.osakac.ac.jp:8080";' > /etc/apt/apt.conf.d/95proxies \
    && echo 'Acquire::https::Proxy "http://wwwproxy.osakac.ac.jp:8080";' >> /etc/apt/apt.conf.d/95proxies

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    wget \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Emscripten SDKをインストール
RUN git clone https://github.com/emscripten-core/emsdk.git /emsdk \
    && cd /emsdk \
    && ./emsdk install latest \
    && ./emsdk activate latest \
    && echo "source /emsdk/emsdk_env.sh" >> ~/.bashrc

ENV PATH="/emsdk:/emsdk/upstream/emscripten:${PATH}"

COPY package*.json ./

RUN npm config set proxy http://wwwproxy.osakac.ac.jp:8080 \
    && npm config set https-proxy http://wwwproxy.osakac.ac.jp:8080 \
    && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]